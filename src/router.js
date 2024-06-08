import { createRouter, createWebHistory } from 'vue-router';
import Principal from './components/Principal.vue';
/* import TableroJugador from './components/TableroJugador.vue'; */
import Pokedex from './components/Pokedex.vue';
import Tablero from './components/Tablero/index.vue';

const routes = [
  { path: '/', component: Pokedex },
  { path: '/pokedex', component: Pokedex },
  { path: '/tablero', component: Tablero },
  { path: '/:pathMatch(.*)*', component: Pokedex }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;