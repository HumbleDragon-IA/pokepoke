<template>
  <div class="pokedex">
    <h1>Pokédex</h1>
    <input
      type="text"
      v-model="query"
      placeholder="Type Pokémon name or ID"
      @input="searchPokemon"
    />
    <ul v-if="suggestions.length" class="suggestion-list">
      <li v-for="suggestion in suggestions" :key="suggestion.name" @click="selectPokemon(suggestion.name)">
        {{ suggestion.name }}
      </li>
    </ul>
    <div v-if="selectedPokemon" class="pokemon-card">
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
</template>

<script>
import pokemonService from '../services/pokemonService';

export default {
  data() {
    return {
      query: '',
      suggestions: [],
      selectedPokemon: null,
    };
  },
  methods: {
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
            this.suggestions = allPokemon.filter(pokemon =>
              pokemon.name.includes(this.query.toLowerCase())
            );
          } catch (error) {
            console.error('Error fetching Pokémon list:', error);
          }
        }
      } else {
        this.suggestions = [];
      }
    },
    async selectPokemon(name) {
      try {
        this.selectedPokemon = await pokemonService.getPokemonDetails(name);
        this.suggestions = [];
        this.query = name;
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    },
  },
};
</script>

<style scoped>
.pokedex {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

input {
  width: 100%;
  padding: 8px;
  margin: 20px 0;
}

.suggestion-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background: white;
  border: 1px solid #ccc;
  position: absolute;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
}

.suggestion-list li {
  padding: 8px;
  cursor: pointer;
}

.suggestion-list li:hover {
  background-color: #f0f0f0;
}

.pokemon-card {
  margin-top: 20px;
  border: 5px solid black;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  background-color: #f9f9f9;
  color: black; /* Color del texto para buena visibilidad */
}

.pokemon-card h2 {
  text-transform: capitalize;
  text-align: center;
  margin: 0;
  padding-bottom: 10px;
}

.pokemon-card img {
  max-width: 150px; /* Ajustar el tamaño para que encaje bien en la tarjeta */
  display: block;
  margin: 0 auto 20px;
}

.pokemon-card .stats {
  margin-top: 20px;
}

.pokemon-card .stats ul {
  list-style: none;
  padding: 0;
}

.pokemon-card .stats ul li {
  padding: 5px 0;
}
</style>