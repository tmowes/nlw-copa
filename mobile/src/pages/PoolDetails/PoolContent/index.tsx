import { useCallback, useEffect, useState } from 'react'

import { Button, FlatList, Heading, HStack, Text, useToast, VStack } from 'native-base'
import { GameProps } from '@models/types'

import { GuessCard } from '@components/GuessCard'
import { Loading } from '@components/Loading'
import { api } from '@services/api'

import { PoolContentProps } from './types'

export function PoolContent(props: PoolContentProps) {
  const { poolId } = props
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState<'guesses' | 'ranking'>('guesses')

  const [poolGames, setPoolGames] = useState<GameProps[]>([])

  const loadGames = useCallback(async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/pools/${poolId}/games`)
      setPoolGames(data.games)
    } catch (error) {
      console.error(error)
      toast.show({
        title: 'Não foi possível carregar o bolão',
        placement: 'top',
        bg: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }, [poolId, toast])

  useEffect(() => {
    loadGames()
  }, [loadGames])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1}>
      <HStack w="full" justifyContent="space-between" p="1" bg="$gray.600" rounded="md" mb="4">
        <Button
          h="8"
          bg={selected === 'guesses' ? '$gray.400' : 'transparent'}
          w="49%"
          mb="0"
          onPress={() => setSelected('guesses')}
        >
          <Heading fontSize="xs" color="$gray.100">
            Seus palpites
          </Heading>
        </Button>
        <Button
          h="8"
          bg={selected === 'ranking' ? '$gray.400' : 'transparent'}
          w="49%"
          mb="0"
          onPress={() => setSelected('ranking')}
        >
          <Heading fontSize="xs" color="$gray.100">
            Ranking do grupo
          </Heading>
        </Button>
      </HStack>
      {selected === 'guesses' ? (
        <FlatList
          data={poolGames}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <GuessCard data={item} poolId={poolId} />}
        />
      ) : (
        <Text color="$gray.200" lineHeight={24} textAlign="center" px="12">
          O ranking desse bolão ainda não foi formado, aguarde os resultados.
        </Text>
      )}
    </VStack>
  )
}
