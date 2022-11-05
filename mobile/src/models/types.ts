export type UserProps = {
  name: string
  avatarUrl?: string
}

export interface PoolProps {
  id: string
  code: string
  title: string
  ownerId: string
  createdAt: string
  owner: {
    name: string
  }
  participants: ParticipantProps[]
  _count: {
    participants: number
  }
}

export type ParticipantProps = {
  id: string
  user: {
    name: string
    avatarUrl: string
  }
}

interface GuessProps {
  id: string
  gameId: string
  createdAt: string
  participantId: string
  homeTeamGoals: number
  awayTeamGoals: number
}

export interface GameProps {
  id: string
  date: string
  homeTeamCountryCode: string
  awayTeamCountryCode: string
  guess: GuessProps | null
}
