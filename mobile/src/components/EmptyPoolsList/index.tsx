import { Button, Text } from 'native-base'

export function EmptyPoolsList() {
  return (
    <Text textAlign="center" fontSize="sm" px="8" color="$gray.200">
      Você ainda não está participando de nenhum bolão, que tal{' '}
      <Button variant="$link">buscar um por código</Button> ou{' '}
      <Button variant="$link">criar um novo</Button>?
    </Text>
  )
}
