import { HStack, VStack, Heading, Avatar, Text } from 'native-base'

import { PoolHeaderProps } from './types'

export function PoolHeader(props: PoolHeaderProps) {
  const { data } = props
  return (
    <HStack w="full" alignItems="center" h="12" py="1">
      <VStack flex={1} h="full" justifyContent="space-between">
        <Heading fontSize="md">{data?.poolName}</Heading>
        <Text fontSize="xs" color="$gray.200">
          Código:{' '}
          <Heading fontSize="xs" color="$gray.200">
            {data?.code}
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
        {data.participants.length === 0 ? (
          <Avatar>0</Avatar>
        ) : (
          data.participants.map(({ uri, initials }) => (
            <Avatar key={uri} source={{ uri }}>
              {initials}
            </Avatar>
          ))
        )}
      </Avatar.Group>
    </HStack>
  )
}
