import { useState } from 'react'

import { Button, Heading, Input, Text, useToast, VStack } from 'native-base'

import LogoSvg from '@assets/logo.svg'
import { api } from '@services/api'

export function CreatePool() {
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [poolName, setPoolName] = useState('')

  const onCreateNewPool = async () => {
    if (!poolName.trim()) {
      toast.show({
        title: 'O nome da bolão é obrigatório',
        placement: 'top',
        bg: 'red.500',
      })
      return
    }
    try {
      setIsSubmitting(true)
      const { data } = await api.post('/pools', { title: poolName })
      toast.show({
        title: 'Bolão criado com sucesso!',
        description: `Código da pool: ${data.code}`,
        bg: 'green.500',
      })
      setPoolName('')
    } catch (error) {
      console.error('error', error)

      toast.show({
        title: 'Não foi possível criar o bolão',
        placement: 'top',
        bg: 'red.500',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
        onChangeText={setPoolName}
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
