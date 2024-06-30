<script>
export default {
  name: 'Navbar',
  data() {
    return {
      navLinks: [
        { name: 'Home', path: '/' },
        { name: 'Comment Forum', path: '/commentForum' },
        { name: 'Matches', path: '/matches' }
      ]
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="@/assets/LogoETFootball.png" alt="ETFootball Logo" width="200" height="auto" class="d-inline-block align-text-top">
      </a>
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
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.navbar-brand {
  font-size: xx-large;
  font-family: MathJax_Script,'Bebas Neue', cursive,Times,STIXGeneral,serif;
}

.nav-link {
  font-size: xx-large;
  font-family: MathJax_Script,'Bebas Neue', cursive,Times,STIXGeneral,serif;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding: 10px 0;
  z-index: 1000;
  background-color: #1e3939 !important; /* Setzen Sie die Hintergrundfarbe auf den gewünschten Hex-Wert */
}
</style>
