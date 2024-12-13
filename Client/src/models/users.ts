import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myFetch'

export async function getAll() {
  return api<DataListEnvelope<User>>('users')
}
export async function getByID(id: number) {
  return api<DataEnvelope<User>>(`users/${id}`)
}

export async function add(user: User) {
  return api<DataEnvelope<User>>('users', user)
}

export async function update(user: User) {
  return api<DataEnvelope<User>>(`users/${user.id}`, user, 'PATCH')
}

export async function remove(id: number) {
  return api<DataEnvelope<User>>(`users/${id}`, undefined, 'DELETE')
}

export interface User {
  id: number
  fname: string
  lname: string
  email: string
  username: string
  password: string
  isAdmin: boolean
}
