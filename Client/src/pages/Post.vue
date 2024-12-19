<script setup lang="ts">
import { type Post, getByUser } from '@/models/posts'
import { ref } from 'vue'
import PostCard from '@/components/PostCard.vue'
import { refSession } from '@/models/users'

const session = refSession()
const userPosts = ref<Post[]>([])

if (session.user && session.user.id !== undefined) {
  getByUser(session.user.id).then((data) => {
    userPosts.value = data.data
  })
}
</script>

<template>
  <div class="columns" v-if="session.user">
    <div class="column is-half">
      <PostCard v-for="post in userPosts" :key="post.userId" :post="post" />
    </div>
  </div>
  <div v-else>
    <p>You must be logged in to view your posts.</p>
  </div>
</template>

<style scoped></style>
