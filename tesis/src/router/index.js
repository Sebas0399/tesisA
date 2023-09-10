import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Ahorcado from '../modules/ahorcado/Ahorcado.vue'
import Memoria from '../modules/memoria/Juego.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ahorcado',
    name: 'ahorcado',
    component: Ahorcado

  },
  {
    path: '/memoria',
    name: 'memoria',
    component: Memoria

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
