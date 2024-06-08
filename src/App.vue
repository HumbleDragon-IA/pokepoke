
<template>

  <div id="principal" class="container mt-3">
    <div >
      <br>
      <Navbar/>
      <RouterView />    
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
  background-attachment: fixed;
  position: relative;
  height: 100vh
}



</style>
