<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { type User, get, getAll, refSession, useLogin } from '@/models/users'

const router = useRouter()
const { login } = useLogin()
const email = ref('')
const password = ref('')
const errormsg = ref('')

const handleLogin = async (event: Event) => {
  event.preventDefault()
  try {
    const isloggedIn = await login(email.value, password.value)
    console.log(isloggedIn)
    if (isloggedIn) {
      router.push({ name: '/' })
    } else {
      errormsg.value = 'Login failed. Invalid credentials'
    }
  } catch (error) {
    errormsg.value = 'An error occurred. Please try again'
    console.error(error)
  }
}
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <p class="title is-1 has-text-centered">Sign In</p>

      <form @submit.prevent="handleLogin" class="box has-background-light">
        <p v-if="errormsg" class="has-text-warning">{{ errormsg }}</p>
        <div class="field">
          <label for="email" class="label">Email</label>
          <div class="control">
            <input class="input" type="email" v-model="email" required />
          </div>
        </div>

        <div class="field">
          <label for="password" class="label">Password</label>
          <div class="control">
            <input type="password" class="input" v-model="password" required />
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
