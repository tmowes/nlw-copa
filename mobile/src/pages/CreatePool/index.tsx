import { useEffect, useState } from 'react'

import { Button, Heading, Input, Text, VStack } from 'native-base'

import LogoSvg from '@assets/logo.svg'

export function CreatePool() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const poolName = 'Bolão do Julius'

  const onCreateNewPool = () => {
    setIsSubmitting(true)
    console.log('create new pool')
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isSubmitting) {
      timeout = setTimeout(() => {
        setIsSubmitting(false)
      }, 500)
    }
    return () => clearTimeout(timeout)
  }, [isSubmitting])

  return (
    <VStack flex={1} bg="transparent" alignItems="center" pt="8" px="6">
      <LogoSvg height={24} />
      <Heading color="white" textAlign="center" fontSize="2xl" my="8">
        Crie seu próprio bolão da copa e compartilhe entre amigos!
      </Heading>
      <Input
        placeholder="Qual nome do seu bolão?"
        mb="4"
        value={poolName}
        returnKeyType="send"
        onSubmitEditing={onCreateNewPool}
      />
      <Button variant="$solid" isLoading={isSubmitting} onPress={onCreateNewPool} mb="2">
        Criar meu bolão
      </Button>
      <Text textAlign="center" fontSize="sm" px="8" color="$gray.200">
        Após criar seu bolão, você receberá um código único que poderá usar para convidar outras
        pessoas.
      </Text>
    </VStack>
  )
}
