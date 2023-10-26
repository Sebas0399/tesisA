import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

import Ahorcado from '../modules/ahorcado/Ahorcado.vue'
import Memoria from '../modules/memoria/Juego.vue'
import Lectura from '../modules/lectura/Lectura.vue'
import Audio from '../modules/audio/Juego.vue'
import Informe from '../modules/informe/Informe.vue'
import Segmentacion from '../modules/lecturaNuevo/Lectura.vue'
import ComprensionLectora from '../modules/comprensionLectora/Juego.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/comprension',
    name: 'comprension',
    component: ComprensionLectora
  },
  {
    path: '/acerca',
    name: 'acerca',
    component: AboutView
  },
  {
    path: '/segmentacion',
    name: 'segmentacion',
    component: Segmentacion
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

  },
  {
    path: '/lectura',
    name: 'lectura',
    component: Lectura

  },
  {
    path: '/audio',
    name: 'audio',
    component: Audio

  },
  {
    path: '/informe',
    name: 'informe',
    component: Informe

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
