import { useState, useCallback } from 'react'

import { Button, Heading, Input, useToast, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { api } from '@services/api'
import { PoolsNavProps } from '@routes/types'
import { Loading } from '@components/Loading'

export function SearchPool() {
  const { navigate } = useNavigation<PoolsNavProps>()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [code, setCode] = useState('')

  const onJoinPool = useCallback(async () => {
    if (!code.trim().length) {
      toast.show({
        title: 'Digite o código do bolão',
        placement: 'top',
        bg: 'red.500',
      })
      return
    }
    try {
      setIsLoading(true)
      await api.post('/pools/join', { code })
      toast.show({
        title: 'Você entrou no bolão com sucesso',
        placement: 'top',
        bg: 'green.500',
      })
      navigate('home')
    } catch (error: any) {
      console.error(error)

      setIsLoading(false)

      if (error.response?.data?.message === 'Pool not found') {
        toast.show({
          title: 'Bolão não encontrado',
          placement: 'top',
          bg: 'red.500',
        })
        return
      }

      if (error.response?.data?.message === 'You are already join this pool') {
        toast.show({
          title: 'Você já está participando deste bolão',
          placement: 'top',
          bg: 'red.500',
        })
        return
      }

      toast.show({
        title: 'Não foi possivel encontrar o bolão',
        placement: 'top',
        bg: 'red.500',
      })
    }
  }, [navigate, code, toast])

  return (
    <VStack flex={1} bg="transparent" alignItems="center" px="6">
      <Heading color="white" textAlign="center" fontSize="2xl" my="8">
        Encontre um bolão através de seu código único
      </Heading>
      <Input
        placeholder="Qual o código do bolão?"
        mb="2"
        autoCapitalize="characters"
        value={code}
        onChangeText={(e) => setCode(e.toUpperCase())}
      />
      <Button
        variant="$solid"
        isLoading={isLoading}
        isLoadingText="Buscando bolão..."
        onPress={onJoinPool}
      >
        Buscar bolão
      </Button>
      {isLoading ? <Loading /> : null}
    </VStack>
  )
}
