<script>
export default {
  name: 'Navbar',
  data() {
    return {
      navLinks: [
        { name: 'Home', path: '/' },
        { name: 'Favourites', path: '/favourites' },
        { name: 'Matches', path: '/matches' }
      ]
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">ETFootball</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" v-for="(link, index) in navLinks" :key="index" :to="link.path">{{ link.name }}</router-link>

        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
</style>