<script>
export default {
  name: 'HomeView'
}
</script>

<template>
  <div class="home-container">
    <div class="home-content">
      <h1>Welcome to ETFootball</h1>
      <p>Stay updated with the latest football match results and news.</p>
      <div class="featured-matches">
        <h2>Featured Matches</h2>
        <ul>
          <li>
            <strong>Team A</strong> vs <strong>Team B</strong>
            <span>2 - 1</span>
          </li>
          <li>
            <strong>Team C</strong> vs <strong>Team D</strong>
            <span>1 - 3</span>
          </li>
          <li>
            <strong>Team E</strong> vs <strong>Team F</strong>
            <span>0 - 0</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  background-color: #f8f9fa;
}

.home-content {
  text-align: center;
  max-width: 800px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.25rem;
  color: #333;
}

.featured-matches {
  margin-top: 20px;
}

.featured-matches h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.featured-matches ul {
  list-style: none;
  padding: 0;
}

.featured-matches li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.featured-matches li span {
  font-weight: bold;
}
</style>
