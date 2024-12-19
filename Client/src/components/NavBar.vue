<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { refSession, useLogin } from '@/models/users'

const isOpen = ref(false)
const session = refSession()
const { logout } = useLogin()

const handleLogout = () => {
  logout()
}
</script>

<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a href="/" class="navbar-item">
          <img alt="Vue logo" class="logo" src="@\assets\logo.svg" width="30" height="30" />
        </a>
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          :class="{ 'is-active': isOpen }"
          @click="isOpen = !isOpen"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navBarBasic"
        class="navbar-menu"
        :class="{ 'is-active': isOpen }"
        @click="isOpen = !isOpen"
      >
        <RouterLink to="/" class="navbar-item">
          <span class="icon">
            <i class="fas fa-home"></i>
          </span>
          Home
        </RouterLink>
        <div v-if="session.user != null" class="navbar-start">
          <RouterLink to="/activity" class="navbar-item">
            <i class="fas fa-running"></i> My Workout
          </RouterLink>
          <RouterLink to="/friends" class="navbar-item"
            ><i class="fas fa-users"></i> Activity
          </RouterLink>
          <RouterLink to="/people" class="navbar-item"
            ><i class="fas fa-search"></i> People Search
          </RouterLink>

          <RouterLink v-if="session.user.isAdmin" to="/admin" class="navbar-item">Admin</RouterLink>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <RouterLink
                v-if="!session.user"
                to="/signup"
                class="navbar-item"
                style="background-color: grey; color: white"
              >
                Signup
              </RouterLink>
              <RouterLink
                v-if="!session.user"
                to="/signin"
                class="navbar-item"
                style="background-color: grey; color: white"
              >
                Sign In
              </RouterLink>
              <button
                v-else
                class="button"
                style="background-color: grey; color: white"
                @click="handleLogout"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div class="navbar-item">
          <a href="https://x.com/">
            <button class="button">
              <span class="icon"><i class="fab fa-twitter"></i></span>
              <p>Tweet</p>
            </button>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="css" scoped>
.router-link-active {
  border-bottom: 5px solid gold;
  font-weight: bold;
}
</style>
