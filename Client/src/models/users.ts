import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myFetch'
import { ref } from 'vue'

export async function getAll() {
  return api<DataListEnvelope<User>>('users')
}

export async function get(id: number) {
  return api<DataEnvelope<User>>(`users/${id}`)
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

const session = ref({
  user: null as User | null,
  message: '',
  isLoading: false
})

export const refSession = () => session

export async function login(email: string, password: string) {
  try {
    const response = await api<DataEnvelope<{ user: User }>>('users/login', { email, password })
    if (response.isSuccess) {
      session.value.user = response.data?.user || null
      return response.data?.user
    } else {
      console.error(`Login failed: ${response.message}`)
    }
  } catch (error) {
    console.error(`Login failed: ${error}`)
  }
  return undefined
}

export function logout() {
  session.value.user = null
}
