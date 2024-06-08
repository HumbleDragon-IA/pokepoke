import { createRouter, createWebHistory } from 'vue-router';
import Pokedex from './components/Pokedex.vue';
import Tablero from './components/Tablero/index.vue';
/* import PokemonCard from './components/PokemonCard.vue'; */

const routes = [
  { path: '/', component: Tablero },
   { path: '/pokedex', component: Pokedex },
  { path: '/tablero', component: Tablero },
 /*  { path: '/pokemoncard', component: PokemonCard }, */
  { path: '/:pathMatch(.*)*', component: Tablero }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;