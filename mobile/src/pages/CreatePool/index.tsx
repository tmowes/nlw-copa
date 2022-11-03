import { useState } from 'react'

import { Button, Heading, Input, Text, VStack } from 'native-base'

import LogoSvg from '@assets/logo.svg'
import { api } from '@services/api'

export function CreatePool() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [poolName, setPoolName] = useState('')

  const onCreateNewPool = async () => {
    try {
      setIsSubmitting(true)
      console.log('create new pool', poolName)
      const { data } = await api.post('/pools', { title: poolName })
      // Alert.alert('Pool created', data.code)
      console.log('Pool created =>>>>', data.code)
      setPoolName('')
    } catch (error) {
      console.error('error', error)
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
