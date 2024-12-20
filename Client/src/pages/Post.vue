<script setup lang="ts">
import { type Post, getByUser } from '@/models/posts'
import { ref } from 'vue'
import PostCard from '@/components/PostCard.vue'
import { refSession } from '@/models/users'
import PostForm from '@/components/PostForm.vue'

const session = refSession()
const userPosts = ref<Post[]>([])

if (session.user && session.user.id !== undefined) {
  getByUser(session.user.id).then((data) => {
    userPosts.value = data.data
  })
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
  <PostForm v-if="isFormOpen" />

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
