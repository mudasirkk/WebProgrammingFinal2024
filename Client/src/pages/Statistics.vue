<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Workout } from '@/models/workouts'

const workouts = ref<Workout[]>([])
const getWorkouts = () => {
  getAll().then((data) => {
    workouts.value = data.data
  })
}
</script>

<template>
  <div class="container">
    <article class="message is-link">
      <div class="message-header">
        <p>Workout Statistics</p>
      </div>
      <div class="message-body">
        <h1>Stats</h1>
      </div>
    </article>
  </div>
</template>

<style scoped>
.container {
  padding: 10rem;
}
.message-header {
  background-color: orange;
  align-self: auto;
}
</style>
