export type PoolHeaderProps = {
  data: {
    code: string
    poolName: string
    createdBy: string
    participants: {
      uri: string
      initials: string
    }[]
  }
}
