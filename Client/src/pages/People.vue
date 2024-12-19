<script lang="ts">
import { ref, watch } from 'vue'
import { type User, search } from '@/models/users'
import type { OptionsPropItem } from '@oruga-ui/oruga-next'

export default {
  setup() {
    const options = ref<OptionsPropItem<User>[]>([]) // Options for autocomplete
    const selected = ref<User | null>(null) // Selected user
    const query = ref('') // Search query

    // Fetch data when the query changes
    async function getAsyncData(query: string) {
      if (!query.trim()) {
        options.value = []
        return
      }

      try {
        const response = await search(query)
        options.value = response.data.map((user: User) => ({
          value: user, // User object
          label: user.fname // Display username in autocomplete
        }))
      } catch (error) {
        console.error('Error fetching data:', error)
        options.value = []
      }
    }

    // Watch for query changes and fetch data
    watch(query, () => getAsyncData(query.value))

    return {
      options,
      selected,
      query,
      getAsyncData // Ensure this is returned for use in the template
    }
  }
}
</script>

<template>
  <section class="hero is-light" style="margin: 10rem">
    <div class="hero-body">
      <div class="column is-centered">
        <o-field label="People Search">
          <o-autocomplete
            v-model="selected"
            :options="options"
            :debounce="500"
            @input="getAsyncData"
            rounded
            expanded
            placeholder="User to Find"
            icon="search"
            clearable
          >
            <template #empty>No results found</template>
          </o-autocomplete>
        </o-field>

        <p><b>Selected:</b> {{ selected }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
