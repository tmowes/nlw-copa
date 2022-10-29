import { Platform } from 'react-native'

import { CaretLeft, Export, PlusCircle, SoccerBall } from 'phosphor-react-native'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { Heading, IconButton, Text, useTheme } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { Home } from '@pages/Home'
import { CreatePool } from '@pages/CreatePool'
import { SearchPool } from '@pages/SearchPool'
import { PoolDetails } from '@pages/PoolDetails'

import { PrivateNavProps, PrivateRoutesProps } from './types'

const { Navigator, Screen } = createBottomTabNavigator<PrivateRoutesProps>()

export default function PrivateRoutes() {
  const { colors, sizes } = useTheme()
  const { navigate } = useNavigation<PrivateNavProps>()

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

  function CustomGoBackButtom() {
    return (
      <IconButton
        onPress={() => navigate('home')}
        icon={<CaretLeft size={24} color={colors.$gray['300']} />}
      />
    )
  }

  function CustomShareButton() {
    return <IconButton icon={<Export size={24} color={colors.$gray['300']} />} />
  }

  return (
    <Navigator screenOptions={screenOptions} initialRouteName="home">
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
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={22} />,
          tabBarLabel: ({ color }) => (
            <Heading color={color} ml="4" lineHeight="xl" fontSize="md">
              Meus bolões
            </Heading>
          ),
          headerTitle: 'Meus bolões',
        }}
      />
      <Screen
        name="search"
        component={SearchPool}
        options={{
          tabBarButton: () => null,
          headerLeft: () => <CustomGoBackButtom />,
          headerTitle: 'Buscar por código',
        }}
      />
      <Screen
        name="pool-details"
        component={PoolDetails}
        options={{
          tabBarButton: () => null,
          headerLeft: () => <CustomGoBackButtom />,
          headerRight: () => <CustomShareButton />,
          headerTitle: 'Detalhes',
        }}
      />
    </Navigator>
  )
}
