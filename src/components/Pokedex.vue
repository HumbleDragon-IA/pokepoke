<template>
  <div class="pokedex">

    <img class="title" src="../assets/poke.png" alt="">

    <input type="text" v-model="query" placeholder="Type Pokémon name or ID" @input="searchPokemon" />
    <ul v-if="suggestions.length" class="suggestion-list">
      <li v-for="suggestion in suggestions" :key="suggestion.name" @click="selectPokemon(suggestion.name)">
        {{ suggestion.name }}
      </li>
    </ul>
    <div class="card-container">
      <div v-if="selectedPokemon" class="pokemon-card">
        <div class="card-header" :style="{ backgroundColor: selectedPokemonColor }">
          <h2>{{ selectedPokemon.name }}</h2>
          <p>#{{ selectedPokemon.id }}</p>
        </div>
        <img class="pokemon-image" :src="selectedPokemon.sprites.front_default" :alt="selectedPokemon.name"
          :style="{ backgroundColor: selectedPokemonColor }" />
        <div class="card-body">
          <p><strong>Type:</strong> {{ selectedPokemon.types[0].type.name }}</p>
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
      selectedPokemonColor: '',
    };
  },
  methods: {
    async searchPokemon() {
      if (this.query.length > 0) {
        // Check if the query is a number (ID)
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
        const species = await pokemonService.getPokemonSpecies(name);
        console.log(this.selectedPokemon);
        this.selectedPokemonColor = species.color.name;
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

.title{
  margin-top: 1rem;
  width: 100%;
  font-weight: bolder;
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

.card-container {
  display: flex;
  justify-content: center;
}

.pokemon-card {
  margin-top: 20px;
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background-color: #f7f7f7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;
  border: solid black 5px;
  background-color: rgb(235, 235, 235);
  width: 500px;
}

.card-header {
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-style: inset;
  font-size: 50px;
  font-weight: bolder;
  border-width: 4px;
}

.card-header h2 {
  text-transform: capitalize;
  margin: 0;
  font-size: 24px;
  font-weight: bolder;
  font-style: oblique;
  font-family: Arial, Helvetica, sans-serif;
}

.card-header p {
  font-size: 18px;
  font-weight: bold;
}

.pokemon-image {
  display: block;
  margin: 0 auto;
  width: 250px;
  height: 250px;
  background: black;
  border: solid 10px black;
  border-radius: 50%;
  padding: 0;
  box-sizing: border-box;
}

.card-body {
  padding: 10px;
}

.card-body p {
  margin: 10px 0;
  text-transform: capitalize;
}

.stats {
  margin-top: 20px;
  border: solid black 3px;
  padding: 25px;
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
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
}

.stats ul li strong {
  text-transform: capitalize;
}
</style>
