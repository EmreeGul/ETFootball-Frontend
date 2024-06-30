<template>
  <div class="container">
    <h1>UEFA EURO 2024 Groups</h1>
    <div class="groups">
      <div class="group" v-for="group in groups" :key="group.name">
        <h2>{{ group.name }}</h2>
        <div class="flags">
          <div
            class="flag"
            v-for="country in group.countries"
            :key="country.name"
            @click="toggleFavorite(country)"
          >
            <img :src="country.flag" :alt="country.name" />
            <span>{{ country.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showConfirmDialog" class="confirm-dialog">
      <p>Are you sure you want to remove {{ selectedCountry.name }} from your favorites?</p>
      <button @click="confirmRemoveFavorite">Yes</button>
      <button @click="cancelRemoveFavorite">No</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import germanyFlag from '@/assets/flagge-deutschland-querformat.png';
import scotlandFlag from '@/assets/Flagge-Schottland-Pantone-300.png';
import hungaryFlag from '@/assets/Ungarn.jpeg';
import switzerlandFlag from '@/assets/flagge-schweiz-querformat.png';
import spainFlag from '@/assets/flagge-spanien.png.jpeg';
import croatiaFlag from '@/assets/Flag_of_Croatia.jpeg';
import italyFlag from '@/assets/flagge-italien.png.jpeg';
import albaniaFlag from '@/assets/61y6MOams+L._AC_UF894,1000_QL80_.jpg';
import sloveniaFlag from '@/assets/Flag_of_Slovenia.png';
import denmarkFlag from '@/assets/Daenermark.png';
import serbiaFlag from '@/assets/Flag_of_Serbia.jpeg';
import englandFlag from '@/assets/Flag_of_England.svg.png';
import polandFlag from '@/assets/flagge-polen.png.jpeg';
import netherlandsFlag from '@/assets/Unknown.png';
import austriaFlag from '@/assets/Flag_of_Austria.png';
import franceFlag from '@/assets/Flag_of_France.svg.png';
import belgiumFlag from '@/assets/belgien.png';
import slovakiaFlag from '@/assets/Flag_of_Slovakia.svg.png';
import romaniaFlag from '@/assets/Flag_of_Romania.png';
import ukraineFlag from '@/assets/ukraine.png';
import turkeyFlag from '@/assets/Flag_of_Turkey.png';
import georgiaFlag from '@/assets/Flag_of_Georgia.svg.png';
import portugalFlag from '@/assets/Flag_of_Portugal.svg.png';
import czechiaFlag from '@/assets/Flag_of_the_Czech_Republic.jpeg';

export default {
  name: 'HomeView',
  data() {
    return {
      groups: [
        {
          name: 'Group A',
          countries: [
            { name: 'Germany', flag: germanyFlag },
            { name: 'Scotland', flag: scotlandFlag },
            { name: 'Hungary', flag: hungaryFlag },
            { name: 'Switzerland', flag: switzerlandFlag }
          ]
        },
        {
          name: 'Group B',
          countries: [
            { name: 'Spain', flag: spainFlag },
            { name: 'Croatia', flag: croatiaFlag },
            { name: 'Italy', flag: italyFlag },
            { name: 'Albania', flag: albaniaFlag }
          ]
        },
        {
          name: 'Group C',
          countries: [
            { name: 'Slovenia', flag: sloveniaFlag },
            { name: 'Denmark', flag: denmarkFlag },
            { name: 'Serbia', flag: serbiaFlag },
            { name: 'England', flag: englandFlag }
          ]
        },
        {
          name: 'Group D',
          countries: [
            { name: 'Poland', flag: polandFlag },
            { name: 'Netherlands', flag: netherlandsFlag },
            { name: 'Austria', flag: austriaFlag },
            { name: 'France', flag: franceFlag }
          ]
        },
        {
          name: 'Group E',
          countries: [
            { name: 'Belgium', flag: belgiumFlag },
            { name: 'Slovakia', flag: slovakiaFlag },
            { name: 'Romania', flag: romaniaFlag },
            { name: 'Ukraine', flag: ukraineFlag }
          ]
        },
        {
          name: 'Group F',
          countries: [
            { name: 'Turkey', flag: turkeyFlag },
            { name: 'Georgia', flag: georgiaFlag },
            { name: 'Portugal', flag: portugalFlag },
            { name: 'Czechia', flag: czechiaFlag }
          ]
        }
      ],
      favorites: [],
      showConfirmDialog: false,
      selectedCountry: null
    };
  },
  methods: {
    toggleFavorite(country) {
      const isFavorite = this.favorites.some(fav => fav.name === country.name);
      if (isFavorite) {
        this.selectedCountry = country;
        this.showConfirmDialog = true;
      } else {
        this.addFavorite(country);
      }
    },
    addFavorite(country) {
      axios.post('https://etfootball-backend.onrender.com/favorites', country)
        .then(response => {
          this.favorites.push(response.data);
        })
        .catch(error => {
          console.error('Error adding favorite:', error);
        });
    },
    removeFavorite(country) {
      axios.delete(`https://etfootball-backend.onrender.com/favorites/${country.name}`)
        .then(response => {
          this.favorites = this.favorites.filter(fav => fav.name !== country.name);
        })
        .catch(error => {
          console.error('Error removing favorite:', error);
        });
    },
    confirmRemoveFavorite() {
      this.removeFavorite(this.selectedCountry);
      this.selectedCountry = null;
      this.showConfirmDialog = false;
    },
    cancelRemoveFavorite() {
      this.selectedCountry = null;
      this.showConfirmDialog = false;
    }
  },
  created() {
    axios.get('https://etfootball-backend.onrender.com/favorites')
      .then(response => {
        this.favorites = response.data;
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
      });
  }
};
</script>

<style scoped>
.container {
  padding: 01px;
  text-align: center;
  margin: 230px;
}

.groups {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.group {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 300px;
  flex: 1 1 calc(33.33% - 40px);
  box-sizing: border-box;
}

.flags {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flag {
  margin: 10px 0;
  text-align: center;
  cursor: pointer;
}

.flag img {
  width: 50px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.flag span {
  display: block;
  margin-top: 5px;
}

.confirm-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style>
