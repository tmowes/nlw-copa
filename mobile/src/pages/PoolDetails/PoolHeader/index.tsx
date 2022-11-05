import { HStack, VStack, Heading, Avatar, Text } from 'native-base'

import { getInitials } from '@utils/getInitialsFromName'

import { PoolHeaderProps } from './types'

export function PoolHeader(props: PoolHeaderProps) {
  const { data } = props
  const { title, code, _count, participants } = data
  return (
    <HStack w="full" alignItems="center" h="12" py="1">
      <VStack flex={1} h="full" justifyContent="space-between">
        <Heading fontSize="md">{title}</Heading>
        <Text fontSize="xs" color="$gray.200">
          Código:{' '}
          <Heading fontSize="xs" color="$gray.200">
            {code}
          </Heading>
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
  )
}
