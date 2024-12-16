<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { refSession, useLogin } from '@/models/session'
import type { Post } from '@/models/posts'

const session = reactive(refSession())
const posts = ref<Post[]>([])
const description = ref('')
const workoutType = ref('')
const date = ref('')
const location = ref('')
const isAdmin = session.user?.isAdmin

const createPost = () => {
  if (description.value.trim() && workoutType.value.trim() && location.value.trim()) {
    posts.value.push({
      id: posts.value.length + 1,
      workoutType: workoutType.value.trim(),
      description: description.value.trim(),
      date: date.value.trim(),
      location: location.value.trim(),
      userId: session.user?.id ?? 0
    })
    description.value = ''
    workoutType.value = ''
    date.value = ''
    location.value = ''
  }
}

const deletePost = (id: number) => {
  posts.value = posts.value.filter((post) => post.id !== id)
}
</script>

<template>
  <div class="container">
    <h1>Comments/Posts</h1>
    <div class="form">
      <textarea v-model="description" placeholder="Write a comment or post..."></textarea>
      <input v-model="workoutType" placeholder="Type of workout" />
      <input v-model="location" placeholder="Location" />
      <button @click="createPost">Submit</button>
    </div>
  </div>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id" class="post-item">
      <p><strong>Workout Type</strong> {{ post.workoutType }}</p>
      <p><strong>Description:</strong> {{ post.description }}</p>
      <p><strong>Location:</strong> {{ post.location }}</p>
      <p><strong>Workout Type:</strong> {{ post.workoutType }}</p>
      <p>{{ post.description }}</p>
      <button
        v-if="isAdmin"
        @click="deletePost(post.id)"
        class="delete-button"
        style="position: absolute; top: 10px; right: 10px"
      >
        Delete
      </button>
    </div>
  </div>
  <!-- <div>
    <input v-model="workoutType" placeholder="Workout Type" />
    <input v-model="description" placeholder="Description" />
    <input v-model="date" placeholder="Date" />
    <input v-model="location" placeholder="Location" />
    <button v-if="session.user" @click="createPost">Create Post</button>
  </div> -->
</template>

<style scoped></style>
