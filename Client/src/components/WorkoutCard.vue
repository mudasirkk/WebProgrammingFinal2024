<script setup lang="ts">
import { ref } from 'vue'
import { type Workout, remove } from '@/models/workouts'

const props = defineProps<{
  workout: Workout
}>()

const emit = defineEmits<{
  (e: 'workout-deleted', workoutId: number): void
}>()

const handleDelete = async (workoutId: number) => {
  await remove(workoutId)
  emit('workout-deleted', workoutId)
}
</script>

<template>
  <div class="media-content">
    <h1 class="has-text-info">
      {{ workout.title }}
    </h1>
    <h1><span class="has-text-warning">Type:</span> {{ workout.type }}</h1>
    <h1><span class="has-text-warning">Duration:</span> {{ workout.duration }} Minutes</h1>
    <h1><span class="has-text-warning">Location:</span> {{ workout.location }}</h1>
    <h1><span class="has-text-warning">UserID:</span> {{ workout.userid }}</h1>
    <div class="buttons">
      <button class="button is-danger" @click="handleDelete(workout.id)">Delete</button>
    </div>
  </div>
</template>

<style scoped></style>
