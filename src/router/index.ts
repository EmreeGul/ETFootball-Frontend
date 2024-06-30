import { createRouter, createWebHistory } from 'vue-router'
import { LoginCallback, navigationGuard } from '@okta/okta-vue'
import HomeView from '../views/HomeView.vue'
import Matches from '../views/Matches.vue'
import CommentForum from '@/views/CommentForum.vue'
import LoginComponent from '@/components/Login.vue'
import Profile from '@/views/Profile.vue'

const routes = [
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
    path: '/commentForum',
    name: 'Comment Forum',
    component: CommentForum
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent,
    meta: { hideLayout: true }  // Spezielles Meta-Flag hinzufügen
  },
  {
    path: '/login/callback',
    component: LoginCallback
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/Register.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(navigationGuard)

export default router
