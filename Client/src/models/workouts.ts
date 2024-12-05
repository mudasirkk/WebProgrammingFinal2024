import { ref } from 'vue'
import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myFetch'
import data from '../data/workouts.json'

export async function getAll() {
  return api<DataListEnvelope<Workout>>('workouts')
}
export async function getById(id: number) {
  return api<DataEnvelope<Workout>>(`workouts/${id}`)
}

export async function getByUser(userid: number) {
  return api<DataListEnvelope<Workout>>(`workouts/user/${userid}`)
}

export function create(workout: Workout) {
  return api<DataEnvelope<Workout>>('workouts', workout)
}

export function update(workout: Workout) {
  return api<DataEnvelope<Workout>>(`workouts/${workout.id}`, workout, 'PATCH')
}

export function remove(id: number) {
  return api<DataEnvelope<Workout>>(`workouts/${id}`, undefined, 'DELETE')
}
export interface Workout {
  id: number
  userid: number
  username: string
  description: string
  title: string
  date: string
  duration: number
  location: string
  type: string
}

const workoutList = ref<Workout[]>(data.workouts)
export const userWorkout = () => workoutList

export function addWorkout(workout: Workout) {
  workout.id = data.workouts.length + 1
  workoutList.value.push(workout)
}

export function deleteWorkout(id: number) {
  const index = workoutList.value.findIndex((w) => w.id === id)
  workoutList.value.splice(index, 1)
}
