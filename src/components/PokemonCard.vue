<template>

  <div class="PokemonCard">
    <div v-if="pokemonDex">
      <div class="card-header">
        <h2>{{ pokemonDex.name }}</h2>
        <p>#{{ pokemonDex.id }}</p>
      </div>
      <img class="pokemon-image" :src="pokemonDex.sprites.other['official-artwork'].front_default"
        :alt="pokemonDex.name" />
      <div class="sound-btn">
        <div class="btn" @click.stop="reproducir">🔊</div>
      </div>
      <div class="card-body">
        <div class="stats">
          <h3>Stats</h3>
          <hr>
          <ul>
            <li class="types">
              <strong class="type-title">Type:</strong>
              <div class="type-icons-container">
                <span v-for="(icon, type) in selectedPokemonTypesIcons" :key="type" class="type-icon">
                  {{ icon }}
                  <span class="type-tooltip">{{ type }}</span>
                </span>
              </div>
            </li>
            <li v-for="stat in pokemonDex.stats" :key="stat.stat.name">
              <strong>{{ stat.stat.name }}:</strong> {{ stat.base_stat }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { typeEmojiMap, typeColorMap } from '@/utils/PokemonDicc';

export default {
  props: ['pokemonDex'],
  methods: {
    reproducir(event) {
      event.stopPropagation();
      const audio = new Audio(this.pokemonDex.cries.latest);
      audio.play().catch(error => {
        console.error('Error al reproducir el audio: ', error);
      });
    },
  },
  computed: {

    selectedPokemonTypesIcons() {
      let types = {};
      if (this.pokemonDex) {
        this.pokemonDex.types.forEach(element => {
          types[element.type.name] = typeEmojiMap[element.type.name];
        });
      }
      console.log(types);
      return types;
    },

    selectedPokemonTypeColor() {
      if (this.pokemonDex) {
        let type = this.pokemonDex.types[0].type.name;
        return typeColorMap[type];
      }
      return '#f7f7f7';
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

.title {
  margin-top: 1rem;
  width: 100%;
}

input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  background-color: #343A40;
  color: white;
}

.suggestion-list {
  list-style: none;
  padding: 5px;
  margin: 0;
  position: relative;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
  font-size: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

}

.suggestion-list li {
  cursor: pointer;
  display: flex;
  text-transform: capitalize;
  justify-content: first baseline;
  align-items: center;
  background-color: #343A40;
  color: white;
}

.suggestion-list li:hover {
  background-color: #4f565c;
}

.card-container {
  display: flex;
  justify-content: center;
}

.pokemon-card {
  height: auto;
  margin-top: 20px;
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background-color: #f7f7f7;
  text-align: center;
  font-family: 'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif;
  position: relative;
  overflow: hidden;
  border: solid white 10px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
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

.pokemon-card>* {
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

.sound-btn {
  display: flex;
  justify-content: center;
}

.type-title {
  margin-right: auto;
}

.type-icons-container {
  display: flex; 
}

.type-icon {
  margin-left: 8px; 
  position: relative; 
  cursor: pointer;
}

.type-tooltip {
  display: none;
  position: absolute;
  bottom: 100%; 
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px;
  border-radius: 5px;
  white-space: nowrap;
  z-index: 10;
  text-transform: capitalize;
}

.type-icon:hover .type-tooltip {
  display: block; 
}
</style>
