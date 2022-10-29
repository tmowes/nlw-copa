import { VStack, Heading, HStack, Center, Text, Image, useTheme, Button } from 'native-base'
import { Check, X } from 'phosphor-react-native'

import { ScoreboardInput } from '@components/ScoreboardInput'
import { convertISOdate } from '@utils/convertISOdate'

import { GuessCardProps } from './types'

export function GuessCard(props: GuessCardProps) {
  const { data } = props
  const { awayTeam, awayTeamLogo, date, guess, homeTeam, homeTeamLogo, status } = data
  const { colors } = useTheme()

  console.log(new Date(date).toISOString())

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
          {homeTeam} vs. {awayTeam}
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
        <ScoreboardInput />
        <Image w="8" h="6" source={{ uri: homeTeamLogo }} alt={homeTeam} />
        <Center flex={1}>
          <X size={24} color={colors.$gray['200']} />
        </Center>
        <Image w="8" h="6" source={{ uri: awayTeamLogo }} alt={awayTeam} />
        <ScoreboardInput />
      </HStack>
      {status === 'pending' && (
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
        >
          CONFIRMAR PALPITE
        </Button>
      )}
      {status === 'expired' && (
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
