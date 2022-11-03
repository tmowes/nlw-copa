import { useCallback, useEffect } from 'react'

import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

import createFastContext from '@contexts/FastContext'
import { api } from '@services/api'

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
      // setUser({ user: { name: 'Julius M.', avatarUrl: 'http://github.com/tmowes.png' } })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading({ loading: false })
    }
  }

  const onSignInWithGoogleSuccess = useCallback(async (access_token: string) => {
    try {
      setLoading({ loading: true })
      const { data } = await api.post('/users', { access_token })
      if (!data?.token) {
        console.error('Error: Invalid token')
        setUser({ user: null })
        return
      }
      api.defaults.headers.Authorization = `Bearer ${data.token}`
      const { data: userData } = await api.get('/me')
      console.log({ userData })
      setUser({
        user: {
          name: userData.user.name,
          avatarUrl: userData.user.avatarUrl,
        },
      })
    } catch (error) {
      setUser({ user: null })
      console.error(error)
    } finally {
      setLoading({ loading: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (response?.type === 'success' && response?.authentication?.accessToken) {
      onSignInWithGoogleSuccess(response.authentication.accessToken)
    }
  }, [onSignInWithGoogleSuccess, response])

  return { onSignInWithGoogle, user, loading }
}

export { useAuth, useSignIn, AuthProvider }
