<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const fname = ref('')
const lname = ref('')
const email = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const router = useRouter()

const handleSubmit = () => {
  // Handle form submission logic here
  console.log({
    fname: fname.value,
    lname: lname.value,
    email: email.value,
    username: username.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  })

  // You can reset the fields after submission if needed
  fname.value = ''
  lname.value = ''
  email.value = ''
  username.value = ''
  password.value = ''
  confirmPassword.value = ''
}
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <p class="title is-1 has-text-centered" style="padding-top: 1rem">Sign Up</p>
      <form @submit.prevent="handleSubmit" class="box has-background-light">
        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              id="fname"
              v-model="fname"
              placeholder="John"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input
              type="text"
              id="lname"
              class="input"
              v-model="lname"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              type="email"
              id="email"
              class="input"
              v-model="email"
              placeholder="john.doe@example.com"
              required
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input
              type="text"
              id="username"
              class="input"
              v-model="username"
              placeholder="johndoe"
              required
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              type="password"
              id="password"
              class="input"
              v-model="password"
              placeholder="pass123"
              required
            />
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
              placeholder="pass123"
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
