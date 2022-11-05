import { useCallback, useEffect, useState } from 'react'

import { Divider, useToast, VStack } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'
import { PoolProps } from '@models/types'

import { PoolDetailsRouteProp, PoolsNavProps } from '@routes/types'
import { poolsData } from '@utils/sampleData'
import { CustomShareButton } from '@components/ShareButton'
import { api } from '@services/api'
import { Loading } from '@components/Loading'

import { NoParticipantsMessage } from './NoParticipantsMessage'
import { PoolHeader } from './PoolHeader'
import { PoolContent } from './PoolContent'

export function PoolDetails() {
  const toast = useToast()
  const { params } = useRoute<PoolDetailsRouteProp>()
  const { setOptions } = useNavigation<PoolsNavProps>()
  const [isLoading, setIsLoading] = useState(true)
  const [poolData, setPoolData] = useState<PoolProps | null>(null)

  const loadPoolDetails = useCallback(
    async (poolId: string) => {
      try {
        setIsLoading(true)
        const { data } = await api.get(`/pools/${poolId}`)
        setOptions({
          headerTitle: data?.title ?? 'Detalhes da pool',
          headerRight: () => <CustomShareButton message={data?.code} />,
        })
        setPoolData(data)
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
    },
    [setOptions, toast],
  )

  useEffect(() => {
    if (params.id) {
      loadPoolDetails(params.id)
    }
  }, [loadPoolDetails, params.id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="transparent" pt="4" px="5">
      {poolData && (
        <>
          <PoolHeader data={poolData} />
          <Divider />
          {poolData.participants.length === 0 ? (
            <NoParticipantsMessage code={poolData.code} />
          ) : (
            <PoolContent poolId={params.id} />
          )}
        </>
      )}
    </VStack>
  )
}
