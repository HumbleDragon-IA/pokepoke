<template>
  <ModalPokemon :pokemonSeleccionadoId="this.pokemonSeleccionado" />

  <div class="pokedex">

    <img class="title" src="../assets/poke.png" alt="">

    <input type="text" v-model="query" placeholder="Escribi el nombre del Pokemon o su ID" @input="searchPokemon" />

    <ul v-if="sugerencias.length" class="suggestion-list">
      <li v-for="suggestion in sugerencias" :key="suggestion.name" @click="selectPokemon(suggestion.name)">
        <span><img alt="" srcset="" :src="suggestion.sprite"></span>
        <span>{{ suggestion.name }}</span>
      </li>
    </ul>
    <div v-if="pokemonSeleccionado" class="pokemon-card" :style="{ backgroundColor: selectedPokemonTypeColor }">

      <PokemonCard :pokemonDex="this.pokemonSeleccionado"></PokemonCard>

    </div>
  </div>

</template>

<script>
import pokemonService from '../services/pokemonService';
import { typeEmojiMap, typeColorMap } from '@/utils/PokemonDicc';
import PokemonCard from './PokemonCard.vue';
export default {

  components: { PokemonCard },

  data() {
    return {
      query: '',
      sugerencias: [],
      pokemonSeleccionado: null,
      pokemonImgSrc: null,
      pokemonAudSrc: null
    };
  },

  mounted() {
    this.clearSearch()
  },

  methods: {
    async searchPokemon() {
      if (this.query.length > 0) {
        if (!isNaN(this.query)) {
          try {
            const pokemon = await pokemonService.getPokemonDetails(this.query);
            this.sugerencias = [
              {
                name: pokemon.name,
                sprite: pokemon.sprites.front_default,
              }
            ];
          } catch (error) {
            console.error('Error al traer Pokémon by ID:', error);
            this.sugerencias = [];
          }
        } else {
          try {
            const allPokemon = await pokemonService.getAllPokemon();
            this.sugerencias = allPokemon.filter(pokemon =>
              pokemon.name.includes(this.query.toLowerCase())
            );
          } catch (error) {
            console.error('Error al traer la lista de pokemones:', error);
          }
        }
      } else {
        this.sugerencias = [];
      }
    },

    async selectPokemon(name) {
      try {
        this.pokemonSeleccionado = await pokemonService.getPokemonDetails(name);
        this.sugerencias = [];
        this.query = name;
        this.emitPokemon();
        this.pokemonImgSrc = this.pokemonSeleccionado.sprites.other["official-artwork"].front_default
        this.pokemonAudSrc = new Audio(this.pokemonSeleccionado.cries.legacy)
      } catch (error) {
        console.error('Error al traer detalles del pokemon:', error);
      }
    },

    clearSearch() {
      this.query = '',
        this.suggestions = [];
      this.pokemonSeleccionado = null;
      this.pokemonSeleccionadoColor = '';
    },
    emitPokemon() {
      this.$emit('pokemon-selected', this.pokemonSeleccionado);

    },
    reproducir() {
      this.pokemonAudSrc.play()
    },
  },

  computed: {

    selectedPokemonTypesIcons() {
      let types = [];
      if (this.pokemonSeleccionado) {
        this.pokemonSeleccionado.types.forEach(element => {
          types.push(typeEmojiMap[element.type.name]);
        });
      }
      return types.join(" ");
    },

    selectedPokemonTypeColor() {

      if (this.pokemonSeleccionado) {
        let type = this.pokemonSeleccionado.types[0].type.name;
        return typeColorMap[type];
      }
      return '#f7f7f7';
    },

  }
};
</script>

<style scoped>
.pokedex {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

.title {
  margin-top: 1rem;
  width: 100%;
}

input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  background-color: #343A40;
  color: white;
}

.suggestion-list {
  list-style: none;
  padding: 5px;
  margin: 0;
  border: 1px solid #ccc;
  position: relative;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
  font-size: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.suggestion-list li {
  cursor: pointer;
  display: flex;
  text-transform: capitalize;
  justify-content: first baseline;
  align-items: center;
  background-color: #343A40;
  color: white;
}

.suggestion-list li:hover {
  background-color: #4f565c;
}

.card-container {
  display: flex;
  justify-content: center;
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

.card-header {
  height: 50px;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 50px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header h2 {
  text-transform: capitalize;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.card-header p {
  font-size: 20px;
  font-weight: bolder;
}

.pokemon-image {
  display: block;
  margin: 0 auto;
  width: 250px;
  height: 250px;
  padding: 0;
  box-sizing: border-box;
}

.stats {
  margin-top: -10px;
  margin-bottom: -30px;
  border: solid black 3px;
  padding: 25px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.stats h3 {
  margin: 0;
  padding: 0;
  font-size: 20px;
}

.stats ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.stats ul li {
  padding: 2px 0;
  display: flex;
  justify-content: space-between;
}

.stats ul li strong {
  text-transform: capitalize;
}
</style>
