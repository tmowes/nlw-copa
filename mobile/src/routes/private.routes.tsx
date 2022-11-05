import { Platform } from 'react-native'

import { PlusCircle, SoccerBall } from 'phosphor-react-native'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { Heading, useTheme } from 'native-base'

import { CreatePool } from '@pages/CreatePool'

import { PrivateRoutesProps } from './types'
import PoolsRoutes from './pools.routes'

const { Navigator, Screen } = createBottomTabNavigator<PrivateRoutesProps>()

export default function PrivateRoutes() {
  const { colors, sizes } = useTheme()

  const screenOptions: BottomTabNavigationOptions = {
    tabBarInactiveTintColor: colors.$gray['200'],
    tabBarActiveTintColor: colors.$yellow['500'],
    tabBarLabelPosition: 'beside-icon',
    headerStyle: { backgroundColor: colors.$gray[600] },
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: colors.$gray['100'],
      fontSize: sizes[4],
    },
    tabBarStyle: {
      backgroundColor: colors.$gray['600'],
      borderTopWidth: 2,
      borderTopColor: colors.$gray['700'],
      height: Platform.OS === 'android' ? 64 : 96,
      paddingBottom: sizes[6],
      paddingTop: sizes[4],
    },
  }

  return (
    <Navigator screenOptions={screenOptions} initialRouteName="pools">
      <Screen
        name="new"
        component={CreatePool}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={22} />,
          tabBarLabel: ({ color }) => (
            <Heading color={color} ml="4" lineHeight="xl" fontSize="md">
              Novo bolão
            </Heading>
          ),
          headerTitle: 'Criar novo bolão',
        }}
      />
      <Screen
        name="pools"
        component={PoolsRoutes}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={22} />,
          tabBarLabel: ({ color }) => (
            <Heading color={color} ml="4" lineHeight="xl" fontSize="md">
              Meus bolões
            </Heading>
          ),
        }}
      />
    </Navigator>
  )
}
