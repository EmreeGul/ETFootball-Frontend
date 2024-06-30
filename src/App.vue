<template>
  <div id="app">
    <Navbar v-if="!$route.meta.hideLayout" :authenticated="authenticated" />
    <RouterView />
    <button v-if="$route.meta.hideLayout" @click="goBack" class="go-back-button">Go Back</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { useAuth } from '@okta/okta-vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const $auth = useAuth()
const $route = useRoute()
const router = useRouter()
const authenticated = ref(false)

async function logout() {
  await $auth.signOut()
}

async function isAuthenticated() {
  authenticated.value = await $auth.isAuthenticated()
}

function goBack() {
  router.push('/')
}

watch(() => $route.path, async () => {
  await isAuthenticated()
})

onMounted(async () => {
  await isAuthenticated()
  $auth.authStateManager.subscribe(isAuthenticated)
})
</script>

<style scoped>
body {
  background-color: #b7c2c5;
  margin: 0;
  font-family: Arial, sans-serif;
}

.go-back-button {
  position: fixed;
  top: 10px;
  left: 10px;
  padding: 5px 10px;
  font-size: 12px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
  z-index: 1000;
}
</style>
