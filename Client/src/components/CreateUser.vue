<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { type User, add, getAll } from '@/models/users'

const fname = ref('')
const lname = ref('')
const email = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const router = useRouter()

const createUser = async () => {
  if (password.value !== confirmPassword.value || password.value === '') {
    alert('Passwords do not match')
    return
  } else if ((await getAll()).data.some((user: User) => user.email === email.value)) {
    alert('Email already in use')
    return
  }

  const newUser: User = {
    fname: fname.value,
    lname: lname.value,
    username: username.value,
    email: email.value,
    password: password.value,
    isAdmin: false
  }
  try {
    await add(newUser)
    router.push('/signin')
  } catch (error) {
    console.error('An error occurred')
  }
}
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <p class="title is-1 has-text-centered" style="padding-top: 1rem">Sign Up</p>
      <form @submit.prevent="createUser" class="box">
        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input class="input" type="text" id="fname" v-model="fname" required />
          </div>
        </div>
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input type="text" id="lname" class="input" v-model="lname" required />
          </div>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input type="email" id="email" class="input" v-model="email" required />
          </div>
        </div>

        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input type="text" id="username" class="input" v-model="username" required />
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input type="password" id="password" class="input" v-model="password" required />
          </div>
        </div>
        <div class="field">
          <label class="label">Confirm Password</label>
          <div class="control">
            <input
              type="password"
              id="confirmPassword"
              class="input"
              v-model="confirmPassword"
              required
            />
          </div>
        </div>
        <div class="field has-text-centered">
          <button class="button is-primary" type="submit">Register</button>
        </div>
      </form>

      <div class="has-text-centered">
        <p class="has-text-danger"><b>OR</b> <RouterLink to="/signin"> Sign In </RouterLink></p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
