import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myFetch'

export async function getAll() {
  return api<DataListEnvelope<Post>>('posts')
}

export async function getById(id: number) {
  return api<DataEnvelope<Post>>(`posts/${id}`)
}

export function create(post: Post) {
  return api<DataEnvelope<Post>>('posts', post)
}

export function update(user: Post) {
  return api<DataEnvelope<Post>>(`posts/${user.id}`, user, 'PATCH')
}

export function remove(id: number) {
  return api<DataEnvelope<Post>>(`posts/${id}`, undefined, 'DELETE')
}

export interface Post {
  id: number
  workoutType: string
  description: string
  date: string
  location: string
  userId: number
}
