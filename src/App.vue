
<template>
  <div id="fondo" class="background">
  <div id="principal" class="container mt-3">
    
    <div >
      <div class="">
      
      <br>

      <Navbar/>
      <RouterView />    
    </div>
  </div>
</div>
</div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
  Navbar
  }
}
</script>


<style>

body {
  background-image: url("./assets/pokeball-pc-hd.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 100vh
}



</style>
