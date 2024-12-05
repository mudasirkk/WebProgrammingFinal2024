<script setup lang="ts">
import { getSession } from '@/models/login'
import { ref } from 'vue'

const session = getSession()
</script>

<template>
  <div v-if="session.user">
    <StatList />
  </div>
  <div v-else>
    <p class="title is-2">Log in to see your stats</p>
  </div>
</template>

<style scoped></style>
