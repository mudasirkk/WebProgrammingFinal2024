<script setup lang="ts">
import { refSession, getAll, remove, type User } from '@/models/users'
import { ref } from 'vue'

const session = refSession()

const users = ref<User[]>([])
const isUser = ref<boolean>(!!session.user)
const isAdmin = ref<boolean>(session.user?.isAdmin || false)

getAll().then((data) => {
  users.value = data.data
})

const handleRemove = async (id: number) => {
  try {
    await remove(id)
    users.value = users.value.filter((user) => user.id !== id)
  } catch (error) {
    console.error('Failed to remove user:', error)
  }
}
</script>

<template>
  <div class="container content" v-if="isUser && isAdmin">
    <div class="box">
      <h1>Users</h1>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Admin</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.fname }}</td>
            <td>{{ user.lname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.isAdmin }}</td>
            <td>
              <button
                @click="user.id !== undefined && handleRemove(user.id)"
                class="button is-danger is-small"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-else class="container">
    <div class="box has-background-danger has-text-centered">
      <p class="has-text-white">Only Admins can view this page</p>
    </div>
  </div>
</template>
