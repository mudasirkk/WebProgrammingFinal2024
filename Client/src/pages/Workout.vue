<script setup lang="ts">
import { ref } from 'vue'
import { getByUser, type Workout } from '@/models/workouts'
import { refSession } from '@/models/users'
import WorkoutCard from '@/components/WorkoutCard.vue'
import WorkoutForm from '@/components/WorkoutForm.vue'

const session = refSession()
const userWorkouts = ref<Workout[]>([])

if (session.user && session.user.id !== undefined) {
  getByUser(session.user.id).then((data) => {
    userWorkouts.value = data.data
  })
}

const deleteWorkout = (id: number) => {
  userWorkouts.value = userWorkouts.value.filter((workout) => workout.id !== id)
}

const isFormOpen = ref(false)
</script>

<template>
  <button
    class="button is-primary has-text-black"
    style="margin: 10px"
    @click="isFormOpen = !isFormOpen"
  >
    <i class="fas fa-plus icon-margin"></i>
  </button>
  <WorkoutForm v-if="isFormOpen" />

  <div class="columns" v-if="session.user">
    <div class="column is-half">
      <WorkoutCard
        v-for="workout in userWorkouts"
        :key="workout.id"
        :workout="workout"
        @workout-deleted="deleteWorkout"
      />
    </div>
  </div>
</template>

<style scoped></style>
