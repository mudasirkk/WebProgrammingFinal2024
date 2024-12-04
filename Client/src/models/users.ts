import type { DataListEnvelope, DataEnvelope } from './dataEnvelope'
import { api } from './myFetch'

export async function getAll() {
  return api<DataListEnvelope<User>>('users')
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
