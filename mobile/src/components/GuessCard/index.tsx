import { useCallback, useState } from 'react'

import { VStack, Heading, HStack, Center, Text, useTheme, Button, useToast } from 'native-base'
import { Check, X } from 'phosphor-react-native'
import { getName } from 'country-list'
import CountryFlag from 'react-native-country-flag'

import { ScoreboardInput } from '@components/ScoreboardInput'
import { convertISOdate } from '@utils/convertISOdate'
import { api } from '@services/api'

import { GuessCardProps } from './types'

export function GuessCard(props: GuessCardProps) {
  const { data, poolId } = props

  const { homeTeamCountryCode, awayTeamCountryCode, date, guess, id } = data
  const { colors } = useTheme()
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [homeTeamGoals, setHomeTeamGoals] = useState(guess?.homeTeamGoals ?? 0)
  const [awayTeamGoals, setAwayTeamGoals] = useState(guess?.awayTeamGoals ?? 0)

  console.log(new Date(date).toISOString())

  const isExpired = new Date(date).getTime() < new Date().getTime()

  const onGuessConfirm = useCallback(async () => {
    if (!poolId?.trim() || !id?.trim()) {
      return
    }
    console.log('confirm guess', {
      poolId,
      gameId: id,
      homeTeamGoals,
      awayTeamGoals,
    })
    try {
      setIsSubmitting(true)
      await api.post(`/pools/${poolId}/games/${id}/guesses`, {
        homeTeamGoals,
        awayTeamGoals,
      })
      // console.log(data)
    } catch (error: any) {
      console.error(error)

      if (error.response?.data?.message === 'Game already started') {
        toast.show({
          title: 'Não é possível palpitar em jogos que já começaram',
          placement: 'top',
          bg: 'red.500',
        })
        return
      }

      toast.show({
        title: 'Não foi possível enviar seu palpite',
        placement: 'top',
        bg: 'red.500',
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [awayTeamGoals, homeTeamGoals, id, poolId, toast])

  return (
    <VStack
      w="full"
      bg="$gray.600"
      p="4"
      rounded="md"
      borderBottomColor="$yellow.500"
      borderBottomWidth={2}
      alignItems="center"
      justifyContent="space-between"
      mb="3"
      minH="32"
    >
      <VStack w="full" alignItems="center">
        <Heading fontSize="sm" lineHeight="xl">
          {getName(homeTeamCountryCode)} vs. {getName(awayTeamCountryCode)}
        </Heading>
        <Text color="$gray.200" fontSize="xs" lineHeight="xl">
          {convertISOdate(date)}
        </Text>
      </VStack>
      <HStack
        w="full"
        h="8"
        space="2"
        alignItems="center"
        justifyContent="space-between"
        mt="4"
      >
        <ScoreboardInput
          value={String(homeTeamGoals)}
          onChangeText={(e) => setHomeTeamGoals(Number(e))}
        />
        <CountryFlag isoCode={homeTeamCountryCode} size={25} style={{ marginRight: 12 }} />
        <Center flex={1}>
          <X size={24} color={colors.$gray['200']} />
        </Center>
        <CountryFlag isoCode={awayTeamCountryCode} size={25} style={{ marginLeft: 12 }} />
        <ScoreboardInput
          value={String(awayTeamGoals)}
          onChangeText={(e) => setAwayTeamGoals(Number(e))}
        />
      </HStack>
      {!guess && !isExpired && (
        <Button
          rightIcon={<Check size={20} color={colors.$white} />}
          bg="$green.500"
          _text={{
            fontSize: 'xs',
          }}
          _pressed={{
            opacity: 0.8,
          }}
          h="9"
          mt="4"
          mb="0"
          onPress={onGuessConfirm}
          isLoading={isSubmitting}
          isLoadingText="Enviando palpite..."
        >
          CONFIRMAR PALPITE
        </Button>
      )}
      {!guess && isExpired && (
        <Button
          h="9"
          mt="4"
          mb="0"
          disabled
          bg="$gray.400"
          _text={{
            color: '$gray.300',
            fontSize: 'xs',
          }}
          _disabled={{
            bg: '$gray.400',
            _text: {
              color: '$gray.300',
            },
          }}
        >
          TEMPO ESGOTADO
        </Button>
      )}
    </VStack>
  )
}
