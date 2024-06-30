<template>
  <div class="home">
    <h1>Willkommen bei ETFootball</h1>
    <p>Entdecken Sie die spannenden Funktionen unserer Plattform:</p>
    <ul>
      <li><router-link to="/matches">Matches</router-link></li>
      <li><router-link to="/commentForum">Comment Forum</router-link></li>
      <li><router-link to="/profile">Profile</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.home h1 {
  font-size: 2.5rem;
  color: #333;
}

.home p {
  font-size: 1.2rem;
  color: #666;
}

.home ul {
  list-style: none;
  padding: 0;
}

.home ul li {
  margin: 10px 0;
}

.home ul li a {
  text-decoration: none;
  color: #007bff;
  font-size: 1.2rem;
}
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Stellt sicher, dass das Element die volle Höhe des Viewports einnimmt */
}
</style>