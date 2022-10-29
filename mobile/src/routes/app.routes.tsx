import { useAuth } from '@contexts/AuthProvider'

import PrivateRoutes from './private.routes'
import PublicRoutes from './public.routes'

export function AppRoutes() {
  const [user] = useAuth((s) => s.user)
  console.log(user)

  if (user) {
    return <PrivateRoutes />
  }

  return <PublicRoutes />
}
