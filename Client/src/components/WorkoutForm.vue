<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { add, type Workout } from '@/models/workouts'
import { refSession } from '@/models/users'

const session = refSession()
const router = useRouter()

const user = session.user
const isOpen = ref<boolean>(false)

const userid = user?.id ?? 0
const title = ref('')
const date = ref('')
const duration = ref(0)
const location = ref('')
const type = ref('')

const submitWorkout = () => {
  if (!session.user) {
    alert('User is not logged in')
    return
  }

  const newWorkout: Workout = {
    userid: userid,
    title: title.value,
    date: date.value,
    duration: duration.value,
    location: location.value,
    type: type.value
  }

  add(newWorkout)
  router.push('/workout')
  isOpen.value = false
}
</script>

<template>
  <div class="content">
    <button class="button" @click="isOpen = true">Create Workout</button>
  </div>
  <div class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background" @click="isOpen = false"></div>
    <div class="modal-content">
      <div class="box">
        <h2 class="title">Add New Workout</h2>
        <form @submit.prevent="submitWorkout">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input v-model="title" class="input" type="text" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Date (mm/dd/yyyy)</label>
            <div class="control">
              <input v-model="date" class="input" type="text" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Duration (minutes)</label>
            <div class="control">
              <input v-model="duration" class="input" type="number" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Location</label>
            <div class="control">
              <input v-model="location" class="input" type="text" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Type</label>
            <div class="control">
              <input v-model="type" class="input" type="text" required />
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-primary" type="submit">Add Workout</button>
            </div>
            <div class="control">
              <button class="button" type="button" @click="isOpen = false">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
