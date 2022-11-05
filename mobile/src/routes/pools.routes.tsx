import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import { IconButton, useTheme } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

import { Home } from '@pages/Home'
import { PoolDetails } from '@pages/PoolDetails'
import { SearchPool } from '@pages/SearchPool'
import { CustomShareButton } from '@components/ShareButton'

import { PoolsNavProps, PoolsRoutesProps } from './types'

const { Navigator, Screen } = createNativeStackNavigator<PoolsRoutesProps>()

export default function PoolsRoutes() {
  const { colors, sizes } = useTheme()
  const { navigate } = useNavigation<PoolsNavProps>()

  const screenOptions: NativeStackNavigationOptions = {
    headerStyle: { backgroundColor: colors.$gray[600] },
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: colors.$gray['100'],
      fontSize: sizes[4],
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

  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="home" component={Home} options={{ headerTitle: 'Meus bolões' }} />
      <Screen
        name="search"
        component={SearchPool}
        options={{
          headerLeft: () => <CustomGoBackButtom />,
          headerTitle: 'Buscar por código',
        }}
      />
      <Screen
        name="pool-details"
        component={PoolDetails}
        options={{
          headerLeft: () => <CustomGoBackButtom />,
          headerRight: () => <CustomShareButton />,
          headerTitle: 'Detalhes',
        }}
      />
    </Navigator>
  )
}
