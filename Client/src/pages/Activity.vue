<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getAll, type Workout } from '@/models/workouts'
import WorkoutCard from '@/components/WorkoutCard.vue'

const workouts = ref<Workout[]>([])
const currUser = ref(window.currUser)
const isOpen = ref(false)

const openForm = () => {
  isOpen.value = true
}

onMounted(async () => {
  const data = await getAll()
  if (data.isSuccess) {
    workouts.value = data.data
  } else {
    console.error(data.message)
  }
})

const userWorkouts = computed(() => {
  if (!workouts.value || !Array.isArray(workouts.value)) return []
  if (!currUser.value) return []
  return workouts.value.filter((workout) => workout.userid === currUser.value.id)
})

const addWorkout = (workout: Workout) => {
  workout.userid = currUser.value.id
  workouts.value.push(workout)
  isOpen.value = false
}

const closeForm = () => {
  isOpen.value = false
}
</script>

<template>
  <div v-if="currUser">
    <div class="container" style="text-align: center">
      <h1 class="title" style="padding-top: 1rem">
        Its good to see you {{ currUser.fname }} {{ currUser.lname }}
      </h1>
      <h1 class="title">Your Workouts</h1>
      <button class="button is-info" @click="openForm">
        <p><i class="fas fa-plus icon-margin"></i> Add</p>
      </button>

      <WorkoutForm v-if="isOpen" @addworkout="addWorkout" @close="closeForm" />

      <div class="is-centered">
        <div class="column is-half">
          <WorkoutCard v-for="workout in workouts" :key="workout.id" :workout="workout" />
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

<style scoped></style>
