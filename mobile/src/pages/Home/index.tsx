import { useCallback, useState } from 'react'

import { Button, Divider, FlatList, useToast, VStack } from 'native-base'
import { MagnifyingGlass } from 'phosphor-react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { PoolProps } from '@models/types'

import { EmptyPoolsList } from '@components/EmptyPoolsList'
import { PoolCard } from '@components/PoolCard'
import { PoolsNavProps } from '@routes/types'
import { api } from '@services/api'
import { Loading } from '@components/Loading'

export function Home() {
  const { navigate } = useNavigation<PoolsNavProps>()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [poolsData, setPoolsData] = useState<PoolProps[]>([])

  const loadPools = useCallback(async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get('/pools')
      setPoolsData(data)
    } catch (error) {
      console.error(error)

      toast.show({
        title: 'Não foi possível carregar os bolões',
        placement: 'top',
        bg: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useFocusEffect(
    useCallback(() => {
      loadPools()
    }, [loadPools]),
  )

  return (
    <VStack flex={1} bg="transparent" alignItems="center" pt="6" px="6">
      <Button
        variant="$solid"
        isLoading={false}
        leftIcon={<MagnifyingGlass weight="bold" size={20} />}
        onPress={() => navigate('search')}
      >
        BUSCAR BOLÃO POR CÓDIGO
      </Button>
      <Divider bg="$gray.400" mt="0" />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          variant="vertical"
          w="full"
          data={poolsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item: poolData }) => (
            <PoolCard
              data={poolData}
              onPress={() => navigate('pool-details', { id: poolData.id })}
            />
          )}
          ListEmptyComponent={<EmptyPoolsList />}
        />
      )}
    </VStack>
  )
}
