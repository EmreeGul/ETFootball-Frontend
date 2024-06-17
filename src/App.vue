<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: { Navbar }
}
</script>

<template>
  <navbar></navbar>
  <router-view/>
  <div>
    <AvailableTeamsComponent />
    <FavouriteTeamsComponent />
  </div>
</template>


<style>
body {
  background-color: #5f5f5f;
}
</style>
