<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { type User, add, getAll } from '@/models/users'

const fname = ref<string>('')
const lname = ref<string>('')
const email = ref<string>('')
const username = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')

const router = useRouter()

const signupUser = async () => {
  if (password.value === '' || password.value !== confirmPassword.value) {
    //Invalid Passwords or no Pass match
    alert('Invalid Password or Passwords do not match')
    return
  } else if ((await getAll()).data.some((user: User) => user.username === username.value)) {
    // Check if username already exists
    alert('This Username already exists')
    return
  } else if ((await getAll()).data.some((user: User) => user.email === email.value)) {
    // Check if email already exists
    alert('This Email is linked to an existing account')
    return
  }
}

//Handle the form submission
const registerUser: User = {
  id: (await getAll()).data.length + 1,
  fname: fname.value,
  lname: lname.value,
  email: email.value,
  username: username.value,
  password: password.value,
  isAdmin: false
}

try {
  //Add the user
  await add(registerUser)
  router.push({ name: '/signin' })
} catch (error) {
  console.error('User Registration Failed')
}
</script>

<template>
  <p>Create User</p>
  <div class="section">
    <div class="columns is-centered">
      <div class="column is-half">
        <form class="box has-background-light">
          <p class="title">Sign Up</p>
          <div class="columns">
            <div class="column is-half">
              <div class="field">
                <label for="fname" class="label">First Name</label>
                <div class="control">
                  <input type="text" id="fname" class="input" v-model="fname" />
                </div>
              </div>
            </div>
            <div class="column is-half">
              <div class="field">
                <label for="lname" class="label">Last Name</label>
                <div class="control">
                  <input type="text" id="lname" class="input" v-model="lname" />
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <label for="email" class="label">Email</label>
            <div class="control">
              <input type="email" id="email" class="input" v-model="email" />
            </div>
          </div>

          <div class="field">
            <label for="username" class="label">Username</label>
            <div class="control">
              <input type="text" id="username" class="input" v-model="username" />
            </div>
          </div>

          <div class="field">
            <label for="password" class="label">Password</label>
            <div class="control">
              <input type="password" id="password" class="input" v-model="password" />
            </div>
          </div>
          <div class="field">
            <label for="confirmPassword" class="label">Confirm Password</label>
            <div class="control">
              <input type="password" id="confirmPassword" class="input" v-model="confirmPassword" />
            </div>
          </div>
          <div class="field has-text-centered">
            <button class="button is-primary" @click.prevent="signupUser">
              <span class="icon">
                <i class="fas fa-user-plus"></i>
              </span>
              &ensp; Register
            </button>
          </div>
        </form>

        <div class="has-text-centered">
          <br /><RouterLink to="/login" class="has-text-info">
            Already have an account? Click here to Login
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped></style>
