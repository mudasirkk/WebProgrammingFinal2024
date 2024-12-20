<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { add, type Post } from '@/models/posts'
import { refSession } from '@/models/users'

const session = refSession()
const router = useRouter()

const user = session.user
const isOpen = ref<boolean>(false)

const userId = user?.id ?? 0
const workoutType = ref('')
const description = ref('')
const date = ref('')
const location = ref('')

const submitPost = () => {
  if (!session.user) {
    alert('User is not logged in')
    return
  }

  const newPost: Post = {
    userId: userId,
    workoutType: workoutType.value,
    description: description.value,
    date: date.value,
    location: location.value
  }

  add(newPost)
  router.push('/post')
  isOpen.value = false
}
</script>

<template>
  <div class="content">
    <button class="button" @click="isOpen = true">Create Post</button>
  </div>
  <div class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background" @click="isOpen = false"></div>
    <div class="modal-content">
      <div class="box">
        <h2 class="title">Add New Post</h2>
        <form @submit.prevent="submitPost">
          <div class="field">
            <label class="label">Workout Type</label>
            <div class="control">
              <input v-model="workoutType" class="input" type="text" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <input v-model="description" class="input" type="text" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Date (mm/dd/yyyy)</label>
            <div class="control">
              <input v-model="date" class="input" type="text" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Location</label>
            <div class="control">
              <input v-model="location" class="input" type="text" required />
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-primary" type="submit">Add Post</button>
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
