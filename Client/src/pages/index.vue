<script setup lang="ts">
import { ref } from 'vue'
import { refSession } from '@/models/users'
import { type Post, getAll } from '@/models/posts'
import PostCard from '@/components/PostCard.vue'
import Greeting from '@/components/Greeting.vue'

const session = refSession()
const posts = ref<Post[]>([])
getAll().then((data) => {
  posts.value = data.data
})
</script>

<template>
  <div v-if="session.user">
    <div class="container has-gap">
      <h1 class="title has-text-centered">
        Welcome back {{ session.user.fname }} {{ session.user.lname }}
      </h1>
      <h1 class="title" style="padding-left: 25%">
        <span class="icon is-large">
          <i class="fas fa-list"></i>
        </span>
        All Posts
      </h1>
    </div>
    <div class="columns">
      <div class="column is-one-quarter"></div>
      <div class="column is-half">
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
      </div>
      <div class="columns is-one-quarter"></div>
    </div>
  </div>
  <div v-else>
    <Greeting />
  </div>
</template>

<style scoped></style>
