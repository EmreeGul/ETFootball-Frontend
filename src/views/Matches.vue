<template>
  <div class="container">
    <h1>Your Favorite Teams</h1>
    <div class="favorites" v-if="favorites.length > 0">
      <div class="favorite" v-for="favorite in favorites" :key="favorite.id">
        <img :src="favorite.flag" :alt="favorite.name" />
        <span>{{ favorite.name }} - Next game in {{ favorite.nextGameIn }} days</span>
        <button @click="removeFavorite(favorite.id)">Remove</button>
      </div>
    </div>
    <div v-else>
      <p>No favorite teams yet.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Matches',
  data() {
    return {
      favorites: []
    };
  },
  created() {
    this.fetchFavorites();
  },
  methods: {
    fetchFavorites() {
      axios.get('https://etfootball-backend.onrender.com/favorites')
        .then(response => {
          this.favorites = response.data.map(favorite => ({
            ...favorite,
            flag: require(`@/assets/${favorite.flag}`) // Pfad zu den Bildern
          }));
        })
        .catch(error => {
          console.error('Error fetching favorites:', error);
        });
    },
    removeFavorite(id) {
      if (confirm('Are you sure you want to remove this favorite?')) {
        axios.delete(`https://etfootball-backend.onrender.com/favorites/${id}`)
          .then(() => {
            this.fetchFavorites();
          })
          .catch(error => {
            console.error('Error removing favorite:', error);
          });
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}

.favorites {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.favorite {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 200px;
  text-align: center;
}

.favorite img {
  width: 50px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.favorite span {
  display: block;
  margin-top: 5px;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #ff1a1a;
}
</style>
