<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

let isActive = ref(false);
let isOpen = ref(false);

</script>

<template>
     <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <a href="/" class="navbar-item">
                    <img alt="Vue logo" class="logo" src="@\assets\icons\VueLogo.svg" width="30" height="30" />
                </a>
                <a
                    role="button"
                    class="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    :class="{ 'is-active': isOpen }"
                    @click="isOpen = !isOpen"
                    data-target="navBarBasic"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navBarBasic" class="navbar-menu" :class="{ 'is-active': isOpen }">
                <div class="navbar-start">
                    <RouterLink to="/" class="navbar-item"> Home </RouterLink>
                    <RouterLink to="/" class="navbar-item"> My Activity </RouterLink>
                    <RouterLink to="/statistics" class="navbar-item"> Statistics </RouterLink>
                    <RouterLink to="/friends" class="navbar-item"> Friends Activity </RouterLink>
                    <RouterLink to="/people" class="navbar-item"> People Search </RouterLink>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link"> Admin </a>
                        <div class="navbar-dropdown">
                            <RouterLink to="/user" class="navbar-item"> Users </RouterLink>
                        </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <RouterLink to="/signup" class="navbar-item">Sign Up</RouterLink>
                    <div class="navbar-item">

                        <div class="buttons">
                            <div class="dropdown is-active">
                                <div class="dropdown-trigger">                                
                                    <button @click="isActive = !isActive" class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                                    <span>Log in</span>
                                    <span class="icon is-small">
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                    </button>
                                </div>

                                <div class="dropdown-menu" id="dropdown-menu1" role="menu" v-show="isActive">
                                    <div class="dropdown-content">
                                    
                                        <a href="#" class="dropdown-item">Mudasir Khan</a>
                                        <a href="#" class="dropdown-item">Billy Smith</a>
                                
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  </template>
  
  
<style lang="scss" scoped></style>
  