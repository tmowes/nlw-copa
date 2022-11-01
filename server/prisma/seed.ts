import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatarUrl: 'https://github.com/tmowes.png',
    },
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  })

  await prisma.game.create({
    data: {
      date: '2022-11-02T18:00:00.000Z',
      homeTeamCountryCode: 'BR',
      awayTeamCountryCode: 'AR',
      guesses: {
        create: {
          homeTeamGoals: 2,
          awayTeamGoals: 1,
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  })

  await prisma.game.create({
    data: {
      date: '2022-11-03T18:00:00.000Z',
      homeTeamCountryCode: 'BR',
      awayTeamCountryCode: 'AR',
    },
  })

  await prisma.game.create({
    data: {
      date: '2022-10-31T18:00:00.000Z',
      homeTeamCountryCode: 'JP',
      awayTeamCountryCode: 'FR',
    },
  })
}
main()
