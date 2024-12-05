import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { api } from './myFetch'
import type { DataEnvelope } from './dataEnvelope'
import type { User } from './users'

const sessionUser = reactive({
  user: null as User | null,
  token: null as string | null
})

export const refSession = () => sessionUser

export function userLogin() {
  const router = useRouter()
  return {
    async login(email: string, password: string): Promise<boolean> {
      const response = await api<DataEnvelope<{ user: User; token: string }>>(
        `users/login/${email}/${password}`,
        { email, password }
      )

      if (response.isSuccess) {
        sessionUser.user = response.data?.user || null
        sessionUser.token = response.data?.token || null

        if (sessionUser.user == null || sessionUser.token == null) {
          return false
        }
        router.push('/')
        return true
      } else {
        console.error('Login failed')
        return false
      }
    },
    logout() {
      sessionUser.user = null
      sessionUser.token = null
      router.push('/login')
    }
  }
}

export function getSession() {
  return sessionUser
}
