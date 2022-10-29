import createFastContext from '@contexts/FastContext'

const { StoreProvider, useStore } = createFastContext<{ user: string | null }>({ user: null })

export { useStore as useAuth, StoreProvider as AuthProvider }
