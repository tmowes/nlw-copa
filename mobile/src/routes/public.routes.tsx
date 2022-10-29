import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Login } from '@pages/Login'

import { PublicRoutesProps } from './types'

const { Navigator, Screen } = createNativeStackNavigator<PublicRoutesProps>()

export default function PublicRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
    </Navigator>
  )
}
