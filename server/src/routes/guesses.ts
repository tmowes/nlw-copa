import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { authenticate } from '../plugins/authenticate'

export async function guessesRoutes(fastify: FastifyInstance) {
  fastify.get('/guesses/count', async () => {
    const guessesCount = await prisma.guess.count()
    return { count: guessesCount }
  })

  fastify.post(
    '/pools/:poolId/games/:gameId/guesses',
    { onRequest: [authenticate] },
    async (request, reply) => {
      const createGuessParams = z.object({ poolId: z.string(), gameId: z.string() })
      const createGuessBody = z.object({ homeTeamGoals: z.number(), awayTeamGoals: z.number() })
      const { poolId, gameId } = createGuessParams.parse(request.params)
      const { homeTeamGoals, awayTeamGoals } = createGuessBody.parse(request.body)

      const participant = await prisma.participant.findUnique({
        where: {
          userId_poolId: {
            userId: request.user.sub,
            poolId,
          },
        },
      })

      if (!participant) {
        return reply.status(404).send({ message: 'Participant not found' })
      }

      const guess = await prisma.guess.findUnique({
        where: {
          participantId_gameId: {
            participantId: participant.id,
            gameId,
          },
        },
      })

      if (guess) {
        return reply.status(409).send({ message: 'Guess already exists' })
      }

      const game = await prisma.game.findUnique({
        where: {
          id: gameId,
        },
      })

      if (!game) {
        return reply.status(404).send({ message: 'Game not found' })
      }

      if (game.date < new Date()) {
        return reply.status(409).send({ message: 'Game already started' })
      }

      await prisma.guess.create({
        data: {
          gameId,
          participantId: participant.id,
          homeTeamGoals,
          awayTeamGoals,
        },
      })

      return reply.status(201).send({ message: 'Guess created' })
    },
  )
}
