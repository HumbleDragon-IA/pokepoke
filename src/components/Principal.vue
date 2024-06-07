<template>

  <section class="src-components-principal">
    
    <hr>
    <div class="jumbotron">
     <table>
      
     </table>
<input type="text" > Agregar Poke
      <div v-if="input.length" class="btn btn-success my-3" @click="this.mostrar()">Agregar Pokemon</div>
     
      <div class="row">
        <div class="col-4" v-for="(pokemon, index) in pokemones" :key="index">

          <div class="card mb-3" style="max-width: 540px;">
            <div class="row no-gutters ">
              <div class="col-md-4 imgPoke">
                <div>
                  <img >
                </div>

              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ pokemon.nombre }} Nivel: {{ pokemon.nivel }}</h5>
                  <div class="card-text">
                    <div>Ataque Base: {{ pokemon.ataque }}</div>
                    <div>Tipo: {{ pokemon.tipo }}</div>
                    <div>Tipo de Ataque: {{ pokemon.tipoDeAtaque }}</div>
                  </div>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    



    <!--   <hr>
    <div>Item</div>
    <div>Nombre: {{ this.pokemon.item.nombre }}</div>
    <div>Tipo: {{ this.pokemon.item.tipo }}</div>
    <div>Bonus: {{ this.pokemon.item.bonus }}</div> -->


  </section>

</template>

<script lang="js">
/* import pokemonServi../services/pokemonServiceonService' */
import  pokemonService from '../services/pokemonService'; 
import * as pokebolaService from '../services/pokebolaService';

export default {
  name: 'src-components-principal',
  props: [],
  mounted() {
   this.getPoke()
  },
  data() {
    return {
      pokemones: [],
      muestra: false,
      input:''

    }
  },
  methods: {
    async getPoke() {
      const pokemones = await pokebolaService.getAll()
      this.pokemones= pokemones
    },

    async postPoke(poke) {
      const pokeGuardado = await pokebolaService.post(poke)
      await this.pokemones.push(pokeGuardado)


    },
    async getPokemonPokedex(name){
      const pokeElegido = await pokemonService.getPokemonDetails(name)
      return pokeElegido
    },
   mostrar(){
    this.mostrar=!this.mostrar
   }
  },


  computed: {

  }
}


</script>

<style scoped lang="css">
.src-components-principal {
  height: 100vh;
  /* Hace que el contenedor ocupe toda la altura de la ventana */
  margin: 0;
  padding: 0;
  background-image: url('@/assets/pokebola.jpg');
  /* URL de tu imagen de fondo */
  background-size: cover;
  /* Ajusta el tamaño de la imagen para cubrir toda la página */
  background-repeat: no-repeat;
  /* Evita que la imagen se repita */
  background-attachment: fixed;
  /* Hace que la imagen de fondo se mantenga fija al hacer scroll */
  background-position: center;
  /* Centra la imagen de fondo */
}

.card-img-top {
  width: 150px;
}

.card-body {
  color: black;

}

.card {
  background-color: yellow;
}

.imgPoke {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 15px;

}

.fondoTarj {
  padding: 15px;
}
</style>
