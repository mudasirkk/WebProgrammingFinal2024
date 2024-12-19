<script setup lang="ts">
import { ref } from 'vue'
import { getByUser, type Workout } from '@/models/workouts'
import { refSession } from '@/models/users'
import WorkoutCard from '@/components/WorkoutCard.vue'

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
</script>

<template>
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
