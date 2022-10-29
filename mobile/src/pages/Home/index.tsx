import { Button, Divider, FlatList, VStack } from 'native-base'
import { MagnifyingGlass } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

import { EmptyPoolsList } from '@components/EmptyPoolsList'
import { PoolCard } from '@components/PoolCard'
import { poolsData } from '@utils/sampleData'
import { PrivateNavProps } from '@routes/types'

export function Home() {
  const { navigate } = useNavigation<PrivateNavProps>()
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
      <FlatList
        variant="vertical"
        w="full"
        data={poolsData}
        keyExtractor={(item) => item.code}
        renderItem={({ item: poolData }) => (
          <PoolCard
            data={poolData}
            onPress={() => navigate('pool-details', { id: poolData.code })}
          />
        )}
        ListEmptyComponent={<EmptyPoolsList />}
      />
    </VStack>
  )
}
