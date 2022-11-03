import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { apiRoutes } from './routes'

async function bootstrap() {
  const fastify = Fastify({ logger: true })
  await fastify.register(cors, { origin: true })
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await fastify.register(jwt, { secret: process.env.JWT_SUPER_SECRET! })
  await fastify.register(apiRoutes)
  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}
bootstrap()
