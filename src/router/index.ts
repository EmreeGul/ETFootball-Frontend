import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Matches from '../views/Matches.vue'
import Favourites from '../views/Favourites.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/matches',
      name: 'matches',
      component: Matches
    },
    {
      path: '/favourites',
      name: 'favorites',
      component: Favourites
    },
  ]
})

export default router
