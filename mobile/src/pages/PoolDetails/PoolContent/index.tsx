import { useState } from 'react'

import { Button, FlatList, Heading, HStack, Text, VStack } from 'native-base'

import { GuessCard } from '@components/GuessCard'
import { sampleGuesses } from '@utils/sampleData'

export function PoolContent() {
  const [selected, setSelected] = useState<'guesses' | 'ranking'>('guesses')
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
          data={sampleGuesses}
          keyExtractor={(item) => item.gameId}
          renderItem={({ item }) => <GuessCard data={item} />}
        />
      ) : (
        <Text color="$gray.200" lineHeight={24} textAlign="center" px="12">
          O ranking desse bolão ainda não foi formado, aguarde os resultados.
        </Text>
      )}
    </VStack>
  )
}
