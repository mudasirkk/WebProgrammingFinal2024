<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import SearchAutocomplete from './components/SearchAutocomplete.vue';
</script>

<template>
  
  <header>
    <NavBar />
  </header>

  <RouterView />
</template>

<style scoped>
</style>
