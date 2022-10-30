import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import type { RouteProp } from '@react-navigation/native'

export type PublicRoutesProps = {
  login: undefined
}

export type PrivateRoutesProps = {
  new: undefined
  pools: undefined
}

export type PublicNavProps = NativeStackNavigationProp<PublicRoutesProps>

export type PrivateNavProps = BottomTabNavigationProp<PrivateRoutesProps>

export type PoolsRoutesProps = {
  home: undefined
  search: undefined
  'pool-details': { id: string }
}

export type PoolsNavProps = NativeStackNavigationProp<PoolsRoutesProps>

export type PoolDetailsRouteProp = RouteProp<PoolsRoutesProps, 'pool-details'>
