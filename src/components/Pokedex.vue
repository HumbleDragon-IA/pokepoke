<template>
  <div class="pokedex">

    <img class="title" src="../assets/poke.png" alt="">

    <input type="text" v-model="query" placeholder="Type Pokémon name or ID" @input="searchPokemon" />
    <ul v-if="suggestions.length" class="suggestion-list">
      <li v-for="suggestion in suggestions" :key="suggestion.name" @click="selectPokemon(suggestion.name)">
        {{ suggestion.name }}
      </li>
    </ul>
    <div v-if="selectedPokemon" class="pokemon-card" :style="{ backgroundColor: selectedPokemonTypeColor }">
      <div class="card-header">
        <h2>{{ selectedPokemon.name }}</h2>
        <p>#{{ selectedPokemon.id }}</p>
      </div>
      <div class="circle"></div>
      <img class="pokemon-image" :src="pokemonImgSrc" :alt="selectedPokemon.name" />

      <div class="card-body">
        <div class="stats">
          <h3>Stats</h3>
          <hr>
          <ul>
            <li><strong>Type:</strong> {{ selectedPokemonTypesIcons }}</li>
            <li v-for="stat in selectedPokemon.stats" :key="stat.stat.name">
              <strong>{{ stat.stat.name }}:</strong> {{ stat.base_stat }}
            </li>
          </ul>
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
      pokemonImgSrc: null,
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
        this.suggestions = [];
        this.query = name;
        this.pokemonImgSrc = this.selectedPokemon.sprites.other["official-artwork"].front_default
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    },
  },
  computed: {
    selectedPokemonTypesIcons() {
      const typeDictionary = {
        bug: "🐞",
        dark: "🌙",
        dragon: "🐲",
        electric: "⚡",
        fairy: "✨",
        fighting: "🥊",
        fire: "🔥",
        flying: "🌪️",
        ghost: "👻",
        grass: "🌿",
        ground: "🗿",
        ice: "❄️",
        normal: "⚪",
        poison: "☠️",
        psychic: "🧠",
        rock: "⛰️",
        steel: "🛡️",
        water: "💧"
      };
      let types = [];
      if (this.selectedPokemon) {
        this.selectedPokemon.types.forEach(element => {
          types.push(typeDictionary[element.type.name]);
        });
      }
      return types.join(" ");
    },
    selectedPokemonTypeColor() {
      const colors = {
        grass: "#d2f2c2",
        poison: "#f7cdf7",
        fire: "#ffd1b5",
        flying: "#eae3ff",
        water: "#c2f3ff",
        bug: "#e0e8a2",
        normal: "#e6e6c3",
        electric: "#fff1ba",
        ground: "#e0ccb1",
        fighting: "#fcada9",
        psychic: "#ffc9da",
        rock: "#f0e09c",
        fairy: "#ffdee5",
        steel: "#e6eaf0",
        ice: "#e8feff",
        ghost: "#dbbaff",
        dragon: "#c4bdff",
        dark: "#a9abb0"
      };
      if (this.selectedPokemon) {
        let type = this.selectedPokemon.types[0].type.name;
        return colors[type];
      }
      return '#f7f7f7';
    }
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
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  position: relative;
  overflow: hidden;
  border: solid white 10px;
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

.pokemon-card > * {
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
