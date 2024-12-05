<script setup lang="ts">
import { userAuth } from '@/models/authentication'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
const isUserSelectionOpen = ref(false)
const { currUser, uLogout } = userAuth()

const logOut = () => {
  uLogout()
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
          <RouterLink to="/" class="navbar-item"> <i class="fas fa-home"></i> Home </RouterLink>
          <RouterLink to="/statistics" class="navbar-item">
            <i class="fas fa-dumbbell"></i> Statistics
          </RouterLink>
          <RouterLink to="/friends" class="navbar-item"> Friends Activity </RouterLink>
          <RouterLink to="/people" class="navbar-item"> People Search </RouterLink>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> Admin </a>
            <div class="navbar-dropdown">
              <RouterLink to="/user" class="navbar-item"> Users </RouterLink>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <RouterLink to="/signup" class="navbar-item">Sign Up</RouterLink>

          <div class="navbar-item">
            <div class="buttons">
              <div class="dropdown is-active">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="css" scoped></style>
