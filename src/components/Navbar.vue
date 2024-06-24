<template>

  <section class="src-components-navbar">


    <nav class="navbar navbar-expand navbar-dark bg-dark">

      <a class="navbar-brand" href="#">
        <img src="../assets/pokeball-logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
        <span><strong> ORTEMON </strong></span>
      </a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

          <li class="nav-item">
            <RouterLink class="nav-link" to="/pokedex">Pokedex</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/tablero" v-if="this.globalStore.getLogueado">Tablero</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/adminview" v-if="this.globalStore.getEsAdmin">Admin View</RouterLink>
          </li>
        </ul>
        <img class="banner-img d-none d-lg-block" src="../assets/Magikarp.webp" alt="">
        <div class="userName">
        <span v-if="this.globalStore.getLogueado"><strong> Hola, {{ globalStore.getNameUsuario }}! </strong></span>
        </div>
        <Login></Login>
      </div>
    </nav>
  </section>
</template>

<script>
import { useGlobalStore } from '@/stores/global.js'
import Login from './Login.vue'
export default {
  name: 'src-components-navbar',
  props: [],
  components: {
    Login,
  },
 
  data() {
    return {
      globalStore: useGlobalStore(),
    }
  },
 
}
</script>

<style scoped lang="css">
.src-components-navbar {
  margin-top: 5vh;
}

nav {
  height: 70px;
  margin-bottom: 20px;
}

.userName{
  color:white; 
  margin-right: 10px;
}
</style>
