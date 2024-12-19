import { useRouter } from 'vue-router'
import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myFetch'
import { reactive } from 'vue'

export async function getAll() {
  return api<DataListEnvelope<User>>('users')
}

export async function get(id: number) {
  return api<DataEnvelope<User>>(`users/${id}`)
}

export async function search(query: string) {
  return api<DataListEnvelope<User>>(`users/search?q=${query}`)
}

export function add(user: User) {
  return api<DataEnvelope<User>>('users', user)
}

export function update(user: User) {
  return api<DataEnvelope<User>>(`users/${user.id}`, user, 'PATCH')
}

export function remove(id: number) {
  return api<DataEnvelope<User>>(`users/${id}`, undefined, 'DELETE')
}

export interface User {
  id?: number
  fname: string
  lname: string
  email: string
  username: string
  password: string
  isAdmin: boolean
}

const router = useRouter()

const session = reactive({
  user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
  isLoading: false
})

export const refSession = () => session

export function getSession() {
  return session
}

export function useLogin() {
  return {
    async login(email: string, password: string): Promise<boolean> {
      const response = await api<DataEnvelope<User>>('users/login', { email, password })
      console.log('API Response:', response)
      if (response.isSuccess) {
        session.user = response.data || null
        console.log(session.user)
        if (session.user == null) {
          console.error('Login failed: User not found')
          return false
        }
        localStorage.setItem('user', JSON.stringify(session.user))
        return true
      } else {
        console.error(`Login failed: ${response.message}`)
        return false
      }
    },
    logout() {
      session.user = null
      localStorage.removeItem('user')
      router.push('/signin')
    }
  }
}
