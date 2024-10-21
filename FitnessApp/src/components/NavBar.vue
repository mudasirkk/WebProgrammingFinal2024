<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
</script>

<template>
     <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="" alt="Site Logo" width="112" height="28">
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

    <div class="navbar-menu" :class="{ 'is-active': isOpen }">
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
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-white">
              <strong>Sign up</strong>
            </a>
            <a class="button is-primary"> Log in </a>
            <a class="button is-primary"> Tweet </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  </template>
  
  
  <style scoped>
    .router-link-active {
        font-weight: bold;
        border-bottom: 2px solid blue;
    }
  </style>
  