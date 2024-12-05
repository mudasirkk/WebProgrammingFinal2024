<script setup lang="ts">
import { ref } from 'vue'
import { getAll, type Workout } from '@/models/workouts'
import { userAuth } from '@/models/authentication'

const workouts = ref<Workout[]>([])
getAll().then((data) => {
  workouts.value = data.data
})

const { currUser } = userAuth()
</script>

<template>
  <div v-if="currUser">
    <div class="container">
      <h1 class="title">Welcome {{ currUser.fname }}</h1>
      <h1 class="title">Your Workouts</h1>
    </div>
    <div class="container">
      <div class="columns is-one-quarter"></div>
      <div class="column is-4" v-for="workout in workouts" :key="workout.id">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h2>{{ workout.title }}</h2>
              <h3>{{ workout.description }}</h3>
              <p>{{ workout.date }}</p>
              <p>{{ workout.duration }}</p>
              <p>{{ workout.date }}</p>
            </div>
          </div>
        </div>
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
