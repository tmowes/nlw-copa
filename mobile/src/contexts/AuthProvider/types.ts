import { UserProps } from '@models/types'

export type AuthContextProps = {
  user: UserProps | null
  loading: boolean
}
