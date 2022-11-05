import { useNavigation } from '@react-navigation/native'
import { Button, Text } from 'native-base'

import { PoolsNavProps, PrivateNavProps } from '@routes/types'

export function EmptyPoolsList() {
  const { navigate } = useNavigation<PoolsNavProps & PrivateNavProps>()
  return (
    <Text textAlign="center" fontSize="sm" px="8" color="$gray.200">
      Você ainda não está participando de nenhum bolão, que tal{' '}
      <Button variant="$link" onPress={() => navigate('search')}>
        buscar um por código
      </Button>{' '}
      ou{' '}
      <Button variant="$link" onPress={() => navigate('new')}>
        criar um novo
      </Button>
      ?
    </Text>
  )
}
