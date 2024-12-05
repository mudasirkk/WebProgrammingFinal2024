<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { userLogin, getSession } from '@/models/login'

const isOpen = ref(false)

const logOut = () => {
  userLogin()
}

const session = getSession()

const handleLogout = () => {
  logOut()
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

      <div id="navBarBasic" class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start">
          <RouterLink to="/activity" class="navbar-item">
            <i class="fas fa-running"></i> My Activity
          </RouterLink>
          <RouterLink to="/friends" class="navbar-item"
            ><i class="fas fa-users"></i> Friends Activity
          </RouterLink>
          <RouterLink to="/people" class="navbar-item"
            ><i class="fas fa-search"></i> People Search
          </RouterLink>

          <div class="navbar-dropdown">
            <RouterLink v-if="session.user?.isAdmin" to="/user" class="navbar-item">
              Admin
            </RouterLink>
          </div>
        </div>

        <div class="navbar-end">
          <RouterLink v-if="!session.user" to="/signup" class="navbar-item"> Signup </RouterLink>
          <div v-if="!session.user" class="navbar-item">
            <div class="buttons">
              <div class="dropdown is-active" @mouseleave="isOpen = false">
                <div class="dropdown-trigger">
                  <button
                    @click="isOpen = !isOpen"
                    class="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                  >
                    <span>Log in</span>
                    <span class="icon is-small">
                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>

                <div class="dropdown-menu" role="menu" v-show="isOpen">
                  <div class="dropdown-content">
                    <a href="/statistics" class="dropdown-item">Mudasir Khan</a>
                    <a href="/statistics" class="dropdown-item">John Doe</a>
                    <a href="/statistics" class="dropdown-item">Jane Doe</a>
                    <hr class="navbar-divider" />
                    <a href="/signin" class="dropdown-item"> Other Account </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="buttons">
            <button class="button is-light" @click="handleLogout">Logout</button>
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

<style lang="css" scoped></style>
