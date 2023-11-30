import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Bienvenida from '../components/Bienvenida.vue'
import Instruccciones from '../components/Instrucciones.vue'

import Ahorcado from '../modules/ahorcado/Ahorcado.vue'
import Memoria from '../modules/memoria/Juego.vue'
import Audio from '../modules/audio/Juego.vue'
import Informe from '../modules/informe/Informe.vue'
import Segmentacion from '../modules/segmentacion/Lectura.vue'
import ComprensionLectora from '../modules/comprensionLectora/Juego.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/instrucciones',
    name: 'instrucciones',
    component: Instruccciones
  },
  {
    path: '/inicio',
    name: 'inicio',
    component: Bienvenida
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
