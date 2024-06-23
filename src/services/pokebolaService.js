import axios from 'axios';
/* import pokemonService from './pokemonService'; */

const API_URL = 'http://localhost:8081';

export const getAllPokemons = async () => {
    try{
    const { data:{ return: pokemon} } = await axios.get(`${API_URL}/pokemon`)
   
        return pokemon
    }
    catch(error) {
        console.error("Error Usuarios GET", error)
        return []
    }

    

};

export const getAllPokemonsByTableroId = async (tableroId)=>{
    try {
        const {data: { return: pokemon} } = await axios.get(`${API_URL}/pokemon/tablero/${tableroId}`)
        return pokemon
    } catch (error) {
        console.error('Error al traer los pokemones', error)
    }
}

export const editPokemon = async (id, pokemon) => {
    try {
        const { data: pokeActualizado } = await axios.put(`${API_URL}/pokemon/${id}`, pokemon)
        return pokeActualizado
    }
    catch(error) {
        console.error("Error productos PUT:", error);
        return {}
    }
}


export const createPokemon = async pokemon  => {
    try{
    const { data: {return: pokemonGuardado} } = await axios.post(`${API_URL}/pokemon`,pokemon)
        return pokemonGuardado
    }
    catch(error) {
        console.error("Error Usuarios POST", error)
        return {}
    }


};

export const deletePokemon = async (id)  => {
    try{
    const { data: pokeEliminado } = await axios.delete(`${API_URL}/pokemon/${id}`)
        return pokeEliminado
    }
    catch(error) {
        console.error("Error Usuarios PUT", error)
        return {}
    }


};