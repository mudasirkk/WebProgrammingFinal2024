<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const router = useRouter()

const handleSubmit = () => {
  // Handle login logic here
  console.log({
    email: email.value,
    password: password.value
  })

  // You can reset the fields after submission if needed
  email.value = ''
  password.value = ''
}
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <p class="title is-1 has-text-centered">Sign In</p>

      <form @submit.prevent="handleSubmit" class="box has-background-light">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="email"
              placeholder="john.doe@example.com"
              required
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              type="password"
              class="input"
              v-model="password"
              placeholder="pass123"
              required
            />
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
