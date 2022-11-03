import axios from 'axios'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { authenticate } from '../plugins/authenticate'

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/me', { onRequest: [authenticate] }, async (request) => ({ user: request.user }))

  fastify.post('/users', async (request) => {
    const createUserBody = z.object({
      access_token: z.string(),
    })

    const { access_token } = createUserBody.parse(request.body)

    const { data } = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const userSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    })

    const { id, email, name, picture } = userSchema.parse(data)

    let user = await prisma.user.findUnique({
      where: {
        googleId: id,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: id,
          name,
          email,
          avatarUrl: picture,
        },
      })
    }

    const token = fastify.jwt.sign(
      { name: user.name, avatarUrl: user.avatarUrl },
      { sub: user.id, expiresIn: '7 days' },
    )

    return { token }
  })
}
