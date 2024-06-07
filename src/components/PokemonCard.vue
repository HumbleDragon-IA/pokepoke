<template >

  <section class="src-components-pokemon-card">
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
    <div class="card-container">
    <div v-if="selectedPokemon" class="pokemon-card">
      <div class="card-header" :style="{ backgroundColor: selectedPokemonColor }">
        <h2>{{ selectedPokemon.name }}</h2>
        <p>#{{ selectedPokemon.id }}</p>
      </div>
      <img class="pokemon-image" :src="selectedPokemon.sprites.front_default" :alt="selectedPokemon.name" :style="{ backgroundColor: selectedPokemonColor }" />
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
  </section>

</template>

<script lang="js">
import pokemonService from '@/services/pokemonService';
  export default  {
    name: 'src-components-pokemon-card',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
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
    }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-pokemon-card {

  }
</style>
