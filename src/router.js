import { createRouter, createWebHistory } from 'vue-router';
import Pokedex from './components/Pokedex.vue';
import Tablero from './components/Tablero/index.vue';


const routes = [
  { path: '/', component: Pokedex, meta: { title: "ORTEMON"} },
  { path: '/pokedex', component: Pokedex, meta: { title: "Pokedex"} },
  { path: '/tablero', component: Tablero, meta: { title: "Tablero"} },
  { path: '/:pathMatch(.*)*', component: Pokedex, meta: { title: "ORTEMON"} }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = 
  to.meta.title || "ORTEMON";
  next();
});

export default router;