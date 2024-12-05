<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userLogin } from '../models/login'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()
const { login } = userLogin()
/*
const handleSignin = async (e: Event) => {
  e.preventDefault()
  try {
    const success = await login(email.value, password.value)
    if (success) {
      router.push({ name: '/' })
    } else {
      errorMessage.value = 'Invalid email or password.'
    }
  } catch (error) {
    errorMessage.value = 'An error occurred during login: Invalid email or password.'
    console.error('Login failed:', error)
  }
}*/
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <form class="box has-background-light">
        <!--@submit="handleSignin"-->
        <p class="title is-1">Sign In</p>

        <div class="field">
          <label for="email" class="label">Email</label>
          <div class="control">
            <input type="email" class="input" v-model="email" required />
          </div>
        </div>

        <div class="field">
          <label for="password" class="label">Password</label>
          <div class="control">
            <input type="password" class="input" v-model="password" required />
          </div>
        </div>

        <div class="field" style="text-align: center">
          <button class="button is-primary" type="submit">Login</button>
          <p v-if="errorMessage" class="has-text-warning">{{ errorMessage }}</p>
        </div>
      </form>
      <div class="has-text-centered">
        <p class="has-text-danger"><b>OR</b></p>
        <RouterLink to="/signup" class="has-text-danger"> Register a new account </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
