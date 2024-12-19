<script setup lang="ts">
import type { Post } from '@/models/posts'
import { type User, get } from '@/models/users'

import { ref, watchEffect } from 'vue'

const props = defineProps<{ post: Post }>()
const { post } = props

const user = ref<User | null>(null)

watchEffect(async () => {
  if (post?.userId) {
    const response = await get(post.userId) // Fetch user by post.userId
    user.value = response.data // Assuming DataEnvelope has a 'data' property containing the User
  }
})
</script>

<template>
  <div class="media box content has-gap">
    <div class="media-content">
      <p v-if="user" class="has-text-primary" style="text-align: center">
        <span class="has-text-danger">Name: </span> {{ user.fname }}
        {{ user.lname }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="has-text-danger">User ID: </span>
        {{ post.userId }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="has-text-danger"
          >Date: </span
        >{{ post.date }}
      </p>
      <p class="has-text-black bold">{{ post.description }}</p>
      <div class="columns">
        <div class="column is-one-third">
          <p class="has-text-primary">Type</p>
          <p class="detail">{{ post.workoutType }}</p>
        </div>
        <div class="column is-one-third">
          <p class="has-text-primary">Location</p>
          <p class="detail">{{ post.location }}</p>
        </div>
        <div class="column is-one-third"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail {
  font-size: 2rem;
  margin-top: -1rem;
}
</style>
