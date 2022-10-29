import { useEffect, useState } from 'react'

import { Divider, VStack } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'

import { PoolDetailsRouteProp, PrivateNavProps } from '@routes/types'
import { poolsData } from '@utils/sampleData'

import { NoParticipantsMessage } from './NoParticipantsMessage'
import { PoolHeader } from './PoolHeader'
import { PoolContent } from './PoolContent'
// import { PoolGuesses } from './PoolGuesses'

export function PoolDetails() {
  const { params } = useRoute<PoolDetailsRouteProp>()
  const { setOptions } = useNavigation<PrivateNavProps>()
  const [poolData, setPoolData] = useState<typeof poolsData[0] | null>(null)

  useEffect(() => {
    if (params.id) {
      const pool = poolsData.find((p) => p.code === params.id) ?? null
      setOptions({
        headerTitle: pool?.poolName ?? 'Detalhes da pool',
      })
      setPoolData(pool)
    }
  }, [params.id, setOptions])

  return (
    <VStack flex={1} bg="transparent" pt="4" px="5">
      {poolData && (
        <>
          <PoolHeader data={poolData} />
          <Divider />
          {poolData.participants.length === 0 ? (
            <NoParticipantsMessage code={poolData.code} />
          ) : (
            <PoolContent />
          )}
        </>
      )}
    </VStack>
  )
}
