import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/user/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
    },
    {
      path: '/post/create',
      name: 'post-create',
      component: () => import('../views/PostCreateView.vue'),
    },
    {
      path: '/board/list',
      name: 'board-list',
      component: () => import('../views/BoardListView.vue'),
    },
    {
      path: '/board/list/:username',
      name: 'board-list-user',
      component: () => import('../views/BoardListView.vue'),
    },
    {
      path: '/user/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
  ],
})

export default router
