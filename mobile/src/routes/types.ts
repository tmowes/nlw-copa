import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import type { RouteProp } from '@react-navigation/native'

export type PublicRoutesProps = {
  login: undefined
}

export type PrivateRoutesProps = {
  home: undefined
  new: undefined
  search: undefined
  'pool-details': { id: string }
}

export type PublicNavProps = NativeStackNavigationProp<PublicRoutesProps>

export type PrivateNavProps = BottomTabNavigationProp<PrivateRoutesProps>

export type PoolDetailsRouteProp = RouteProp<PrivateRoutesProps, 'pool-details'>
