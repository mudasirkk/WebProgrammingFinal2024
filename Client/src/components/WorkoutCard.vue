<script setup lang="ts">
import { getAll, type User } from '@/models/users'
import type { Workout } from '../models/workouts'
import { computed, ref, type Ref } from 'vue'

const props = defineProps<{
  workout: Workout
}>()
const user = ref<User[]>([])
getAll().then((data) => {
  if (data.isSuccess) {
    user.value = data.data
  } else {
    console.error(data.message)
  }
})
</script>

<template>
  <div class="media box content has-background-light">
    <div class="media-left">
      <figure class="image is-32x32">
        <img src="../assets/logo.svg" alt="VueLogo" class="pic" />
      </figure>
    </div>
    <div class="media-content">
      <p class="has-text-primary" style="font-weight: bold">
        {{ workout.title }} {{ workout.username }}
        <small>@{{ workout.userid }} &nbsp; {{ workout.date }}</small>
      </p>
      <p class="has-text-white" style="font-weight: bold">{{ workout.description }}</p>
      <div class="columns">
        <div class="column is-one-third">
          <h3 class="is-3">{{ workout.type }}</h3>
          <p class="has-text-primary">Type</p>
        </div>
        <div class="column is-one-third">
          <h3 class="is-3">{{ workout.duration }} minutes</h3>
          <p class="has-text-primary">minutes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pic {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin-right: 1rem;
}
</style>
