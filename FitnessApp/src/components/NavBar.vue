<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
</script>

<template>
     <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <img alt="Vue logo" src="" width="30" height="30" />
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
            <a class="button is-primary">
              <strong >Sign up</strong>
            </a>
            <a class="button is-light"> Log in </a>
            <a class="button is-light"> Tweet </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  </template>
  
  
  <style scoped>
    .router-link-active {
        box-shadow: inset;
    }
    .navbar-item {
        color: white;
        font-size: normal;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif ;
    }
    .navbar-link {
        color: white;
    }
    .navbar-dropdown-navbar-item {
        color: black;
    }
    button.is-light {
        color: black;
    }
  </style>
  