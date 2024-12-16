import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '@/models/users'

const session = reactive({
  user: null as User | null
})

export function useRegister() {
  const router = useRouter()
  return {
    login(user: User) {
      session.user = user
    },
    logout() {
      session.user = null
      router.push('/signup')
    }
  }
}

export function useLogin() {
  const router = useRouter()
  return {
    login(user: User) {
      session.user = user
    },
    logout() {
      session.user = null
      router.push('/signin')
    }
  }
}

export const refSession = () => session
