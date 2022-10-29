export type GuessCardProps = {
  data: {
    gameId: string
    homeTeam: string
    awayTeam: string
    guess: {
      homeTeam: number
      awayTeam: number
    }
    homeTeamLogo: string
    awayTeamLogo: string
    date: string
    status: 'pristine' | 'pending' | 'expired'
  }
}
