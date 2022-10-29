export type PoolCardProps = {
  data: {
    code: string
    poolName: string
    createdBy: string
    participants: {
      uri: string
      initials: string
    }[]
  }
  onPress: () => void
}
