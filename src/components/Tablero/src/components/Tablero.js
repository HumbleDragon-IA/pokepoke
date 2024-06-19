import * as pokebolaService from '../../../../services/pokebolaService';
import ModalPokemon from '../../../ModalPokemon.vue';
import ModalBorrarPokemon from '../../../ModalBorrarPokemon.vue';
import pokemonService from '@/services/pokemonService';
import { altTypeColorMap } from '@/utils/PokemonDicc';


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
      mostrar: false,
      editarId: null,
      pokemonId: {},
      mostrar2: false,
      borrarId: null,
      consultaStats: false,
      pokemonDex: {}
    };
  },
  methods: {
    async verStats(pokemonNombre) {
      try {
        const pokemon = await pokemonService.getPokemonDetails(pokemonNombre);
        this.pokemonDex = pokemon;
        this.consultaStats = true;
        this.mostrar = true;
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    },
    agregar() {
      this.editarId = null;
      this.pokemonId = {};
      this.mostrar = true;
      this.consultaStats = false
    },
    editar(id) {
      this.editarId = id;
      this.pokemonId = { ...this.pokemones.find(p => p.id === id) };
      this.mostrar = true;
      this.consultaStats = false
    },
    ocultar() {
      this.mostrar = false;
      this.editarId = null;
      this.pokemonId = {};
      this.consultaStats = false
    },
    async enviar(poke) {
      console.log(poke);
      this.mostrar = false;
      if (this.editarId) {
        await this.putPokemon(this.editarId, poke);
        this.pokemonId = {};
        this.editarId = null;
        this.consultaStats = false
      } else {
        await this.postPoke(poke);
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
      if (!poke || !poke.types || !poke.stats) {
        console.error('Invalid Pokémon data:', poke);
        return;
      }

        const nuevoPoke = {
        nombre: poke.name,
        nivel: 1,
        type: poke.types.map(typeInfo => typeInfo.type.name).join(', '),
        ataque: poke.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0,
        defense: poke.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0,
        specialAttack: poke.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat || 0,
        specialDefense: poke.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat || 0,
        speed: poke.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0,
        numero: poke.id,
        hp: poke.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0,
        image: poke.sprites.other['showdown'].front_default,
        sonido: poke.cries.latest,
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
    colorPorTipo(pokemon){
      let tipo = pokemon.type.split(',')[0];
      return altTypeColorMap[tipo];
    }
  }
}