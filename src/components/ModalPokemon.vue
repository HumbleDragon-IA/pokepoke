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
                <div>
                  <input type="text" v-model="query" placeholder="Type Pokémon name or ID" @input="searchPokemon" />
                  <ul v-if="suggestions.length" class="suggestion-list">
                    <li v-for="suggestion in suggestions" :key="suggestion.name" @click="selectPokemon(suggestion.name)">
                      {{ suggestion.name }}
                    </li>
                  </ul>
                  <div v-if="selectedPokemon && muestra" class="pokemon-card">
                    <h2>{{ selectedPokemon.name }}</h2>
                    <img :src="selectedPokemon.sprites.front_default" :alt="selectedPokemon.name" />
                    <p><strong>Height:</strong> {{ selectedPokemon.height }} dm</p>
                    <p><strong>Weight:</strong> {{ selectedPokemon.weight }} hg</p>
                    <div class="stats">
                      <h3>Stats</h3>
                      <ul>
                        <li v-for="stat in selectedPokemon.stats" :key="stat.stat.name">
                          <strong>{{ stat.stat.name }}:</strong> {{ stat.base_stat }}
                        </li>
                      </ul>
                     
                    </div>
                  </div>
                </div>
              </div>
              <button :disabled="!pokemonValido" :class="['btn', { 'btn-warning': editarId, 'btn-success': !editarId }, 'mt-5 mb-3', 'float-right']">
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
import pokemonService from '@/services/pokemonService';

export default {
  name: 'ModalPokemon',
  props: ['mostrar', 'editarId', 'pokemonId'],

  beforeCreate(){
  this.selectedPokemon=null

  },
  mounted() {
    
    this.modal = new Modal(document.getElementById('exampleModal'), {
      keyboard: false,
      backdrop: 'static',
    });
  },

beforeUpdate(){
  console.log('beforeuptdate')
},
  updated(){
    
    console.log('updated')
  },
  afterUpdate(){
  this.selectedPokemon=null

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
    async selectPokemon(name) {
      try {
        this.selectedPokemon = await pokemonService.getPokemonDetails(name);
        this.suggestions = [];
        this.query = name;
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    },
    async searchPokemon() {
      if (this.query.length > 0) {
        if (!isNaN(this.query)) {
          try {
            const pokemon = await pokemonService.getPokemonDetails(this.query);
            this.suggestions = [{ name: pokemon.name }];
          } catch (error) {
            console.error('Error fetching Pokémon by ID:', error);
            this.suggestions = [];
          }
        } else {
          try {
            const allPokemon = await pokemonService.getAllPokemon();
            this.suggestions = allPokemon.filter(pokemon => pokemon.name.includes(this.query.toLowerCase()));
          } catch (error) {
            console.error('Error fetching Pokémon list:', error);
          }
        }
      } else {
        this.suggestions = [];
      }
    },
    show() {
      this.modal.show();
    },
    hide() {
      this.modal.hide();
    },
    submit() {
      this.$emit('enviar', { ...this.selectedPokemon });
    },
    ocultar() {
      this.$emit('ocultar');
    },
  },
  computed: {
    pokemonValido() {
      return this.selectedPokemon !== null;
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