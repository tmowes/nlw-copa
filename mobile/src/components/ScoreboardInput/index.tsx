import { Input, IInputProps } from 'native-base'

export function ScoreboardInput(props: IInputProps) {
  return (
    <Input
      w="10"
      h="8"
      value="0"
      px="3"
      py="0"
      bg="$gray.700"
      _focus={{
        bg: '$gray.700',
      }}
      {...props}
    />
  )
}
