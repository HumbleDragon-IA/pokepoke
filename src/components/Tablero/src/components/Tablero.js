import pokemonService from '../../../../services/pokemonService';
import * as pokebolaService from '../../../../services/pokebolaService';
import ModalPokemon from '../../../ModalPokemon.vue';
import ModalBorrarPokemon from '../../../ModalBorrarPokemon.vue';

export default {
  components: {
    ModalPokemon,
    ModalBorrarPokemon,
  },
  mounted() {
    this.getPoke();
  },
  data() {
    return {
      pokemones: [],
      query: '',
      suggestions: [],
      selectedPokemon: null,
      mostrar: false,
      editarId: null,
      pokemonId: {},
      mostrar2: false,
      borrarId: null,
    };
  },
  methods: {
    agregar() {
      this.editarId = null;
      this.pokemonId = {};
      this.mostrar = true;
    },
    editar(id) {
      this.editarId = id;
      this.pokemonId = { ...this.pokemones.find(p => p.id === id) };
      this.mostrar = true;
    },
    ocultar() {
      this.mostrar = false;
      this.editarId = null;
      this.pokemonId = {};
    },
    async enviar(poke) {
      console.log(poke);
      this.mostrar = false;
      if (this.editarId) {
        await this.putPokemon(this.editarId, poke);
        this.pokemonId = {};
        this.editarId = null;
      } else {
        await this.postPoke(poke);
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
    async selectPokemon(name) {
      try {
        this.selectedPokemon = await pokemonService.getPokemonDetails(name);
        this.suggestions = [];
        this.query = name;
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    },
    async getPoke() {
      const pokemones = await pokebolaService.getAll();
      this.pokemones = pokemones;
    },
    async putPokemon(id, pokemon) {
      const pokeActualizado = await pokebolaService.put(id, pokemon);
      console.log(pokeActualizado);
    },
    async postPoke(poke) {
      const tipoDeAtaque = poke.types.map(typeInfo => typeInfo.type.name).join(', ');
      const ataque = poke.stats.find(stat => stat.stat.name === 'attack').base_stat;

      const nuevoPoke = {
        nombre: poke.name,
        nivel: 1,
        tipoDeAtaque: tipoDeAtaque,
        ataque: ataque,
        numero: poke.id,
        image: poke.sprites.front_default,
      };

      try {
        const pokeGuardado = await pokebolaService.post(nuevoPoke);
        this.pokemones.push(pokeGuardado);
      } catch (error) {
        console.error('Error saving Pokémon to Mockapi:', error);
      }
    },
    async deletePokemon(id) {
      console.log(id);
      const pokeEliminado = await pokebolaService.del(id);
      console.log(pokeEliminado, 'delete');

      const index = this.pokemones.findIndex(pokemon => pokemon.id === pokeEliminado.id);
      this.pokemones.splice(index, 1);
    },
  },
};