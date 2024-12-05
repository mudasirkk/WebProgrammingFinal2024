import { reactive } from 'vue'
import type { DataEnvelope } from './dataEnvelope'
import type { User } from './users'

import { useRouter } from 'vue-router'
import { api } from './myFetch'

const sessionUser = reactive({
  user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
  token: localStorage.getItem('token') as string | null
})

export function userLogin() {
  return {
    async login(email: string, password: string): Promise<boolean> {
      const response = await api<DataEnvelope<{ user: User; token: string }>>('users/signin', {
        email,
        password
      })

      if (response.isSuccess) {
        sessionUser.user = response.data?.user || null
        sessionUser.token = response.data?.token || null

        if (sessionUser.user == null || sessionUser.token == null) {
          return false
        }

        localStorage.setItem('user', JSON.stringify(sessionUser.user))
        localStorage.setItem('token', sessionUser.token)

        return true
      } else {
        console.error('Login Failed!')
        return false
      }
    },
    logout() {
      sessionUser.user = null
      sessionUser.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      const router = useRouter()
      router.push('/signin')
    }
  }
}

export function getSession() {
  return sessionUser
}
