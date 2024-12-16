<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { type User, get, getAll } from '@/models/users'
import { refSession, useLogin } from '@/models/session'

const session = refSession()
const users = ref<User[]>([])
const router = useRouter()
const { login, logout } = useLogin()

getAll().then((data) => {
  users.value = data.data
})
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <p class="title is-1 has-text-centered">Sign In</p>

      <form @submit.prevent="" class="box has-background-light">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="text" placeholder="john.doe@example.com" required />
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input type="password" class="input" placeholder="pass123" required />
          </div>
        </div>

        <div class="field has-text-centered">
          <button class="button is-primary" type="submit">Login</button>
        </div>
      </form>
      <div class="has-text-centered">
        <p class="has-text-danger"><b>OR</b><RouterLink to="/signup"> Register </RouterLink></p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
