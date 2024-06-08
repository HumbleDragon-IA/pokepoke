<template>
  <section class="src-components-modal-pokemon">
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="exampleModalLabel">{{ editarId ? 'Edición' : 'Ingreso' }} de Pokemon</h2>
            <button @click="ocultar" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="m-3" @submit.prevent="submit">
              <div class="form-group">
                <label for="nombre">Nombre o ID</label>

                <Pokedex ref="pokedex" @pokemon-selected="updateSelectedPokemon"></Pokedex>
           
              </div>
              <button :disabled="!pokemonValido" :class="['btn', { 'btn-warning': editarId, 'btn-success': !editarId }, 'mt-5 mb-3', 'float-right']" >
                {{ editarId ? 'Actualizar' : 'Agregar' }}
                

              </button>
              <button type="button" @click="ocultar" class="btn btn-secondary mt-5 mb-3 float-left">
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Modal } from 'bootstrap';
/* import pokemonService from '@/services/pokemonService'; */
import Pokedex from './Pokedex.vue';

export default {
  name: 'ModalPokemon',
  props: ['mostrar', 'editarId', 'pokemonId','pokeElegido'],
components: {Pokedex},
  beforeCreate(){
    console.log('beforeuCreate')

  },
  created(){
    console.log('created')
  },
  beforMount(){
    console.log('beforemount')

  },
  mounted() {
    
    console.log(this.pokeElegido)
    this.modal = new Modal(document.getElementById('exampleModal'), {
      keyboard: false,
      backdrop: 'static',
      
    });
  },

beforeUpdate(){
  
  console.log('beforeuptdate')
 
},
  updated(){
   
  },
 
  beforeUnmount(){
    console.log('beforeUnmount')
  },
  unmounted(){
    console.log('unmonunt')
  
  },
  data() {
    return {
      modal: null,
      query: '',
      suggestions: [],
      selectedPokemon: null,
      muestra: true,
    };
  },
  methods: {
   
    updateSelectedPokemon(pokemon) {
    this.selectedPokemon = pokemon;
  },
  show() {
    this.modal.show();
    this.$refs.pokedex.clearSearch()
  },
  hide() {
    this.modal.hide();
  },
  submit() {
    if (this.selectedPokemon) {
      this.$emit('enviar', this.selectedPokemon);
    } else {
      console.error('No Pokémon selected');
    }
    this.selectedPokemon = null;
  },
  ocultar() {
    this.$emit('ocultar');
  },
  },
  computed: {
    pokemonValido() {
      return this.pokeElegido !== null;
    },
  },
  watch: {
    mostrar(newMostrar) {
      if (newMostrar) {
        this.show();
      } else {
        this.hide();
      }
    },
  },
};
</script>

<style scoped lang="css">
.suggestion-list {
  list-style-type: none;
  padding: 0;
}
.suggestion-list li {
  cursor: pointer;
  padding: 5px;
  border: 1px solid #ddd;
}
.suggestion-list li:hover {
  background-color: #eee;
}
.pokemon-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
}
.stats ul {
  list-style-type: none;
  padding: 0;
}
</style>