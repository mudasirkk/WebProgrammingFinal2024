<template>
    <div class="user">
      <container></container>
      <h1>Login</h1>
      <h2>In the meantime you can login using the login menu on the top right.</h2>
      <p>Logging in as Moshe should give you access to the Activity page as well as the admin pages (right now just users). Logging in as other should give you only the Activity page</p>
    </div>
  </template>
  
  <style>
  @media (min-width: 1024px) {
    .user {
      display: flex;
      flex-direction: column;
    }
    h1{
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    h2{
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    p{
      font-size: 1rem;
    }
  }
  </style>