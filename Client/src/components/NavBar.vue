<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isActive = ref(false)
const isOpen = ref(false)
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
          data-target="navBarBasic"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navBarBasic" class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start">
          <RouterLink to="/" class="navbar-item"> My Activity </RouterLink>
          <RouterLink to="/statistics" class="navbar-item"> Statistics </RouterLink>
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
                    @click="isActive = !isActive"
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

                <div class="dropdown-menu" role="menu" v-show="isActive">
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
