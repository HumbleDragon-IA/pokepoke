import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

const pokemonService = {
  async getAllPokemon() {
    try {
      const response = await axios.get(`${API_BASE_URL}/pokemon?limit=150`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
      throw error;
    }
  },

  async getPokemonDetails(nameOrId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/pokemon/${nameOrId.toLowerCase()}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for ${nameOrId}:`, error);
      throw error;
    }
  },

  async getPokemonSpecies(nameOrId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/pokemon-species/${nameOrId.toLowerCase()}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching species details for ${nameOrId}:`, error);
      throw error;
    }
  }
};

export default pokemonService;
