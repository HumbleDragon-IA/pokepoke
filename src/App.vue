
<template class="">
  <div id="fondo" class="background">
  <div id="principal" class="container mt-3">
    
    <div >
      <div class="">
      <h1>Ortemon</h1>
      
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


<style scoped>
#app{
  background-color: black;
  /* background-image:  url('@/assets/pokebola.jpg'); */
}
#logo{
  width: 1000px;
}

#principal{

}
.background {
  height: 100vh; /* Hace que el contenedor ocupe toda la altura de la ventana */
  margin: 0;
  padding: 0;
  background-image: url('@/assets/pokebola.jpg'); /* URL de tu imagen de fondo */
  background-size: cover; /* Ajusta el tamaño de la imagen para cubrir toda la página */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  background-attachment: fixed; /* Hace que la imagen de fondo se mantenga fija al hacer scroll */
  background-position: center; /* Centra la imagen de fondo */
}
</style>
