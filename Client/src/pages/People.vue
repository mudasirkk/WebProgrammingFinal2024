<template>
  <section class="hero is-light" style="margin: 10rem">
    <div style="padding: 1rem">
      <p class="title is-1" style="text-align: center">People Search</p>
    </div>

    <div class="hero-body">
      <div class="column is-centered">
        <form class="box has-background-light">
          <div class="field">
            <div class="control">
              <label for="username" class="label">Friend's Email</label>
              <input type="email" class="input" required />
            </div>
          </div>
          <div class="field has-text-centered">
            <button class="button is-primary">
              <span class="icon">
                <i class="fas fa-search"></i>
              </span>
              <p>Search</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
