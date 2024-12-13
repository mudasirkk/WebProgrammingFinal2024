<script setup lang="ts">
import { ref } from 'vue'

const user = {
  id: 3,
  fname: 'Mudasir',
  lname: 'Khan',
  email: 'mudasir.khan@example.com',
  username: 'mudasirkhan',
  password: 'pass123',
  isAdmin: true
}
</script>

<template>
  <div v-if="user">
    <p class="title is-2">View Activity Here</p>
  </div>
  <div v-else>
    <p class="title is-2">Log in to see your stats</p>
  </div>
</template>

<style scoped></style>
