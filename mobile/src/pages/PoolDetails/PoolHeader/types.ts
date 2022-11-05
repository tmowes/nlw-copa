import { PoolProps } from '@models/types'

export type PoolHeaderProps = {
  data: Pick<PoolProps, 'title' | 'code' | '_count' | 'participants'>
}
