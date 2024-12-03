<template>
  <div class="container">
    
    <div>
      <h1 class="title">Friends Activity</h1>
    </div>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <button class="button is-info is-fullwidth">Add Workout</button>
        <form>
          <div class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Add Workout</p>
                <button class="delete" aria-label="close"></button>
              </header>
              <section class="modal-card-body"><!----></section>
              <footer class="modal-card-foot">
                <button class="button is-success">Save Changes</button>
                <button class="button">Cancel</button>
              </footer>
            </div>
          </div>
        </form>
        <br>
        <div>
          <article class="media box">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png">
              </p>
            </figure>
            <div class="media-content">
              <div class="content"></div>
            </div>
          </article>
        </div>
      </div>
    </div>
  
  </div>
  </template>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>