import usePageProps from './use_page_props'
// @ts-ignore
import { SessionLucidUserProvider } from '@adonisjs/auth/build/modules/session_guard/user_providers/lucid'
import User from '../../../app/models/user'

export default function useAuth() {
  const props = usePageProps<{
    auth: SessionLucidUserProvider<typeof User>;
  }>()

  return props.auth
}
