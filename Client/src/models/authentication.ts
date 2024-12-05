import { ref } from 'vue'
import type { User } from './users'

const currUser = ref<User | null>(null)

export function uLogin(user: User) {
  currUser.value = user
}

export function uLogout() {
  currUser.value = null
}

export function userAuth() {
  return {
    currUser,
    uLogin,
    uLogout
  }
}
