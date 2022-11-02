import { useEffect } from 'react'

import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

import createFastContext from '@contexts/FastContext'

import { clientId } from '../../secrets'
import { AuthContextProps } from './types'

WebBrowser.maybeCompleteAuthSession()

const { StoreProvider: AuthProvider, useStore: useAuth } = createFastContext<AuthContextProps>({
  user: null,
  loading: false,
})

const useSignIn = () => {
  const [user, setUser] = useAuth((store) => store.user)
  const [loading, setLoading] = useAuth((store) => store.loading)

  // console.log(AuthSession.makeRedirectUri({ useProxy: true }))

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  })

  const onSignInWithGoogle = async () => {
    try {
      setLoading({ loading: true })
      await promptAsync()
      setUser({ user: { name: 'Julius M.', avatarUrl: 'http://github.com/tmowes.png' } })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading({ loading: false })
    }
  }

  const onSignInWithGoogleSuccess = async (token: string) => {
    console.log('onSignInWithGoogleSuccess ==>>', token)
  }

  useEffect(() => {
    if (response?.type === 'success' && response?.authentication?.accessToken) {
      onSignInWithGoogleSuccess(response.authentication.accessToken)
    }
  }, [response])

  return { onSignInWithGoogle, user, loading }
}

export { useAuth, useSignIn, AuthProvider }
