import * as pokebolaService from '@/services/pokebolaService';
import ModalPokemon from '@/components/ModalPokemon.vue';
import pokemonService from '@/services/pokemonService';
import { altTypeColorMap } from '@/utils/PokemonDicc';
import { useGlobalStore } from '@/stores/global.js';

export default {

  components: {
    ModalPokemon
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
      pokemonDex: {},
      globalStore: useGlobalStore(),
      editingPokemonId: null,
      editingApodo: '',
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
      this.consultaStats = false;
    },

    editar(id) {
      this.editarId = id;
      this.pokemonId = { ...this.pokemones.find(p => p.id === id) };
      this.mostrar = true;
      this.consultaStats = false;
    },

    ocultar() {
      this.mostrar = false;
      this.editarId = null;
      this.pokemonId = {};
      this.consultaStats = false;
    },

    async enviar(poke) {
      this.mostrar = false;
      if (this.editarId) {
        await this.putPokemon(this.editarId, poke);
        this.pokemonId = {};
        this.editarId = null;
        this.consultaStats = false;
      } else {
        await this.postPoke(poke);
      }
    },

    async getPoke() {
      const pokemones = await pokebolaService.getAllPokemonsByTableroId(this.globalStore.tableroId);
      this.pokemones = pokemones;
    },

    async putPokemon(id, pokemon) {
      await pokebolaService.editPokemon(id, pokemon);
      this.getPoke();
    },

    async postPoke(poke) {
      if (!poke || !poke.types || !poke.stats) {
        console.error('Invalid Pokémon data:', poke);
        return;
      }
      const nuevoPoke = {
        nroPokemon: poke.id,
        apodo: poke.name,
        nivel: 1,
        tableroId: this.globalStore.tableroId,
        type: poke.types.map(typeInfo => typeInfo.type.name).join(', '),
        attack: poke.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0,
        defense: poke.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0,
        specialAttack: poke.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat || 0,
        specialDefense: poke.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat || 0,
        speed: poke.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0,
        hp: poke.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0,
        image: poke.sprites.other['showdown'].front_default,
        sonido: poke.cries.latest,
      };
      try {
        await pokebolaService.createPokemon(nuevoPoke);
      } catch (error) {
        console.error('Error saving Pokémon to Mockapi:', error);
      }
      this.getPoke();
    },

    async deletePokemon(id) {
      if (confirm("Esta seguro de borrar el pokemon?")) {
        await pokebolaService.deletePokemon(id);
        this.getPoke();
      }
    },

    enableEditing(id, apodo) {
      this.editingPokemonId = id;
      this.editingApodo = apodo;
    },

    async updateApodo(pokemon) {
      if (this.editingApodo.trim() === '') {
        return;
      }
      pokemon.apodo = this.editingApodo;
      await this.putPokemon(pokemon.id, pokemon);
      this.editingPokemonId = null;
      this.editingApodo = '';
    },

    colorPorTipo(pokemon) {
      if (!pokemon.type) {
        return '#fff';
      }
      let tipo = pokemon.type.split(',')[0];
      return altTypeColorMap[tipo];
    },
  },
  computed: {
    nombreUsuario(){
      return this.globalStore.nameUsuario
    }
  }

};
