import { Button, Heading, Input, VStack } from 'native-base'

export function SearchPool() {
  return (
    <VStack flex={1} bg="transparent" alignItems="center" px="6">
      <Heading color="white" textAlign="center" fontSize="2xl" my="8">
        Encontre um bolão através de seu código único
      </Heading>
      <Input placeholder="Qual o código do bolão?" mb="2" />
      <Button variant="$solid" isLoading={false}>
        Buscar bolão
      </Button>
    </VStack>
  )
}
