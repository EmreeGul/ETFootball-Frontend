<script setup lang="ts">
import { oktaSignIn } from '../main'
import { onMounted, onUnmounted, nextTick } from 'vue'

onMounted(() => {
  nextTick(() => {
    oktaSignIn.showSignInAndRedirect(
      { el: '#okta-signin-container' },
    )
  })
})

onUnmounted(() => {
  oktaSignIn.remove()
})
</script>

<template>
  <div class="login-container">
    <div id="okta-signin-container"></div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#okta-signin-container {
  width: 100%;
  max-width: 400px; /* Maximalbreite für das Widget */
}
</style>
