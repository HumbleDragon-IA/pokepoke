<template>
  <div v-if="pokemon" class="pokemon-card">
    <div class="card-header" :style="{ backgroundColor: pokemonColor }">
      <h2>{{ pokemon.name }}</h2>
      <p>#{{ pokemon.id }}</p>
    </div>
    <img class="pokemon-image" :src="pokemon.sprites.front_default" :alt="pokemon.name" :style="{ backgroundColor: pokemonColor }" />
    <div class="card-body">
      <p><strong>Type:</strong> {{ pokemon.types[0].type.name }}</p>
      <div class="stats">
        <h3>Stats</h3>
        <ul>
          <li v-for="stat in pokemon.stats" :key="stat.stat.name">
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
  props: {
    pokemonId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      pokemon: null,
      pokemonColor: '',
    };
  },
  async mounted() {
    await this.fetchPokemonDetails();
  },
  methods: {
    async fetchPokemonDetails() {
      try {
        this.pokemon = await pokemonService.getPokemonDetails(this.pokemonId);
        const species = await pokemonService.getPokemonSpecies(this.pokemonId);
        this.pokemonColor = species.color.name;
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Your styles here */
</style>