export type AuthContextProps = {
  user: UserProps | null
  loading: boolean
}

export type UserProps = {
  name: string
  avatarUrl?: string
}
