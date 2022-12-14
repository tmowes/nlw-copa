import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { authenticate } from '../plugins/authenticate'

export async function gamesRoutes(fastify: FastifyInstance) {
  fastify.get('/pools/:poolId/games', { onRequest: [authenticate] }, async (request) => {
    const getPoolParams = z.object({ poolId: z.string() })
    const { poolId } = getPoolParams.parse(request.params)

    const games = await prisma.game.findMany({
      orderBy: {
        date: 'desc',
      },
      include: {
        guesses: {
          where: {
            participant: {
              userId: request.user.sub,
              poolId,
            },
          },
        },
      },
    })

    return {
      games: games.map((game) => ({
        ...game,
        guess: game.guesses.length > 0 ? game.guesses[0] : null,
        guesses: undefined,
      })),
    }
  })
}
