import { TouchableOpacity } from 'react-native'

import { Avatar, Heading, HStack, Text, VStack } from 'native-base'

import { getInitials } from '@utils/getInitialsFromName'

import { PoolCardProps } from './types'

export function PoolCard(props: PoolCardProps) {
  const { data, onPress } = props
  const { owner, title, participants, _count } = data
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <HStack
        w="full"
        bg="$gray.600"
        p="4"
        rounded="md"
        borderBottomColor="$yellow.500"
        borderBottomWidth={2}
        alignItems="center"
        mb="3"
        h="20"
      >
        <VStack flex={1} h="full" justifyContent="space-between">
          <Heading fontSize="md">{title}</Heading>
          <Text fontSize="xs" color="$gray.200">
            Criado por {owner.name}
          </Text>
        </VStack>
        <Avatar.Group
          _avatar={{
            size: 'sm',
            borderColor: '$gray.600',
            bg: '$gray.400',
            borderWidth: 2,
            _text: {
              color: '$gray.100',
              fontSize: '2xs',
            },
          }}
          space={-3}
          max={4}
          _hiddenAvatarPlaceholder={{
            bg: '$gray.400',
            size: 'sm',
            zIndex: 999,
            _text: {
              color: '$gray.100',
              fontSize: '2xs',
            },
          }}
        >
          {_count.participants === 0 ? (
            <Avatar>0</Avatar>
          ) : (
            participants.map(({ user }) => (
              <Avatar key={user.name} source={{ uri: user.avatarUrl }}>
                {getInitials(user.name)}
              </Avatar>
            ))
          )}
        </Avatar.Group>
      </HStack>
    </TouchableOpacity>
  )
}
