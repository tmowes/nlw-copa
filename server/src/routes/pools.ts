import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { generateCode } from '../lib/short-id'
import { authenticate } from '../plugins/authenticate'

export async function poolsRoutes(fastify: FastifyInstance) {
  fastify.get('/pools/count', async () => {
    const poolsCount = await prisma.pool.count()
    return { count: poolsCount }
  })

  fastify.post('/pools', async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    })

    const { title } = createPoolBody.parse(request.body)
    const code = String(generateCode()).toUpperCase()

    try {
      await request.jwtVerify()

      await prisma.pool.create({
        data: {
          title,
          code,
          ownerId: request.user.sub,
          participants: {
            create: {
              userId: request.user.sub,
            },
          },
        },
      })
    } catch (e) {
      await prisma.pool.create({
        data: {
          title,
          code,
        },
      })
    }

    return reply.status(201).send({ code })
  })

  fastify.post('/pools/join', { onRequest: [authenticate] }, async (request, reply) => {
    const joinPoolBody = z.object({
      code: z.string(),
    })

    const { code } = joinPoolBody.parse(request.body)

    const pool = await prisma.pool.findUnique({
      where: { code },
      include: {
        participants: {
          where: {
            userId: request.user.sub,
          },
        },
      },
    })

    if (!pool) {
      return reply.status(404).send({ message: 'Pool not found' })
    }

    if (pool.participants.length > 0) {
      return reply.status(400).send({ message: 'You are already join this pool' })
    }

    if (!pool.ownerId) {
      await prisma.pool.update({
        where: { id: pool.id },
        data: {
          ownerId: request.user.sub,
        },
      })
    }

    await prisma.participant.create({
      data: {
        poolId: pool.id,
        userId: request.user.sub,
      },
    })

    return reply.status(201).send({ message: 'Joined pool' })
  })

  fastify.get('/pools', { onRequest: [authenticate] }, async (request) => {
    const pools = await prisma.pool.findMany({
      where: {
        participants: {
          some: {
            userId: request.user.sub,
          },
        },
      },
      include: {
        _count: {
          select: {
            participants: true,
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatarUrl: true,
              },
            },
          },
          take: 4,
        },
      },
    })

    return { pools }
  })

  fastify.get('/pools/:id', { onRequest: [authenticate] }, async (request) => {
    const getPoolIdParams = z.object({ id: z.string() })

    const { id } = getPoolIdParams.parse(request.params)

    const pool = await prisma.pool.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            participants: true,
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatarUrl: true,
              },
            },
          },
          take: 4,
        },
      },
    })

    return { pool }
  })
}
