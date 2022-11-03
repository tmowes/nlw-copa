import { FastifyInstance } from 'fastify'

import { authRoutes } from './auth'
import { gamesRoutes } from './games'
import { guessesRoutes } from './guesses'
import { poolsRoutes } from './pools'
import { usersRoutes } from './users'

export async function apiRoutes(fastify: FastifyInstance) {
  await fastify.register(authRoutes)
  await fastify.register(gamesRoutes)
  await fastify.register(guessesRoutes)
  await fastify.register(poolsRoutes)
  await fastify.register(usersRoutes)
}
