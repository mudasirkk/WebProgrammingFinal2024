<script setup lang="ts">
import { ref } from 'vue'
import { getAll, type Workout } from '@/models/workouts'
import { getSession } from '@/models/login'
import WorkoutCard from '@/components/WorkoutCard.vue'

const workouts = ref<Workout[]>([])
getAll().then((data) => {
  workouts.value = data.data
})

const session = getSession()
</script>

<template>
  <div v-if="session.user">
    <div class="container">
      <h1 class="title">Its good to see you {{ session.user.fname }}</h1>
      <h1 class="title">Your Workouts</h1>
    </div>
    <div class="container">
      <div class="columns is-one-quarter"></div>
      <div class="column is-half">
        <WorkoutCard v-for="workout in workouts" :key="workout.id" :workout="workout" />
      </div>
    </div>
  </div>
  <div v-else>
    <div class="container" style="text-align: center">
      <h1 class="title">Welcome Guest</h1>
      <h2 class="subtitle">Please Log In from the User Dropdown</h2>
    </div>
  </div>
</template>

<style></style>
