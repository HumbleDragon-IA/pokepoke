<template>
  <section class="src-components-modal-pokemon">
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="exampleModalLabel">{{ consultaStats? 'Stats' : 'Ingreso' }} de Pokemon</h2>
            <button @click="ocultar" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="this.consultaStats" class="pokemon-card" :style="{ backgroundColor: selectedPokemonTypeColor }"> 
               <PokemonCard :pokemonDex="pokemonDex" > </PokemonCard> 
            </div>
            <form class="m-3" @submit.prevent="submit">
              <div class="form-group">
                <span v-if="!this.consultaStats"> <Pokedex ref="pokedex" @pokemon-selected="updatePokemonSeleccionado" /> </span>
                
                
              </div>
              <button v-if="!consultaStats" :disabled="!pokemonSeleccionado"
                :class="['btn', { 'btn-warning': editarId, 'btn-success': !editarId }, 'mt-5 mb-3', 'float-right']">
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
import Pokedex from './Pokedex.vue';
import PokemonCard from './PokemonCard.vue';

export default {
  name: 'ModalPokemon',
  props: ['mostrar', 'editarId', 'pokemonId', 'consultaStats', 'pokemonDex'],
  components: { Pokedex, PokemonCard },
  mounted() {
    this.modal = new Modal(document.getElementById('exampleModal'), {
      keyboard: false,
      backdrop: 'static',
    });
  },
  data() {
    return {
      modal: null,
      pokemonSeleccionado: null,
    };
  },
  methods: {
    updatePokemonSeleccionado(pokemon) {
      this.pokemonSeleccionado = pokemon;
    },
    show() {
      this.modal.show();
      this.$refs.pokedex.clearSearch();
    },
    hide() {
      this.modal.hide();
    },
    submit() {
      if (this.pokemonSeleccionado) {
        this.$emit('enviar', this.pokemonSeleccionado);
      } else {
        console.error('No Pokémon selected');
      }
      this.pokemonSeleccionado = null;
    },
    ocultar() {
      this.$emit('ocultar');
    },
    verStats(){
      this.$emit('verStats');
    }
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
  height: auto;
  margin-top: 20px;
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background-color: #f7f7f7;
  text-align: left;
  font-family: 'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif;
  position: relative;
  overflow: hidden;
  border: solid white 10px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}
.pokemon-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('../assets/card-texture.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 1.5;
  z-index: 1;
  mix-blend-mode: multiply;
}

.pokemon-card>* {
  position: relative;
  z-index: 2;
}
.stats ul {
  list-style-type: none;
  padding: 0;
}
</style>