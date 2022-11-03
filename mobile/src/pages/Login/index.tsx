import { Button, Center, Text } from 'native-base'
import { GoogleLogo } from 'phosphor-react-native'

import LogoSvg from '@assets/logo.svg'
import { useSignIn } from '@contexts/AuthProvider'

export function Login() {
  const { onSignInWithGoogle, loading } = useSignIn()

  return (
    <Center flex={1} bg="transparent" px="6">
      <LogoSvg />
      <Button
        variant="solid"
        colorScheme="error"
        bg="$red.500"
        mt="12"
        leftIcon={<GoogleLogo color="white" weight="bold" size={22} />}
        onPress={onSignInWithGoogle}
        isLoading={loading}
        isLoadingText="Entrando..."
      >
        ENTRAR COM GOOGLE
      </Button>
      <Text fontSize="sm" textAlign="center" color="$gray.200" px="8">
        Não utilizamos nenhuma informação além do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
}
