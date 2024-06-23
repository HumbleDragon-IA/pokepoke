import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/pokeapi';

const pokemonService = {

  async getAllPokemon() {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
      throw error;
    }
  },

  async getPokemonDetails(nameOrId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${nameOrId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for ${nameOrId}:`, error);
      throw error;
    }
  }
  
}

export default pokemonService;
