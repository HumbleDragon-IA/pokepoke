
<template>

  <div id="principal" class="container mt-3">
    <div class="container">
      <br>
      <Navbar/>
      <RouterView />    
    </div>
  </div>
  <footer class="footer mt-auto py-3 bg-dark text-white text-center">
      <div class="container">
        <span>Trabajo Práctico Programación en Nuevas Tecnologías II - Benvin - Leybovich - Lutteri - Montalti</span>
      </div>
  </footer>

</template>

<script>
import Navbar from './components/Navbar.vue'
import Register from './components/Register.vue'

export default {
  name: 'App',
  components: {
  Navbar,
  Register
  }
}
</script>


<style>

body {
  background-image: url("./assets/pokeball-pc-hd.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  min-height: 100vh
}

#principal{
  min-height: 100vh;
  padding-bottom: 25px;
}

footer {
  margin-top: 25px;
}



</style>
