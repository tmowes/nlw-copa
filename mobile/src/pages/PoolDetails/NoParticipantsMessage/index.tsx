import { Share } from 'react-native'

import { Button, Center, Heading, Link, Text } from 'native-base'

import { NoParticipantsMessageProps } from './types'

export function NoParticipantsMessage(props: NoParticipantsMessageProps) {
  const { code } = props
  const onShare = async () => {
    await Share.share({ message: code })
  }
  return (
    <Center bg="transparent">
      <Text
        textAlign="center"
        fontSize="sm"
        mt="2"
        px="8"
        color="$gray.200"
        // lineHeight={22}
        textDecorationLine="none"
      >
        Esse bolão ainda não tem participantes, que {'\n'} tal{' '}
        <Button variant="$link" onPress={onShare}>
          compartilhar o código
        </Button>{' '}
        do bolão com alguém? Use o código <Heading fontSize="sm">{code}</Heading>
      </Text>
    </Center>
  )
}
