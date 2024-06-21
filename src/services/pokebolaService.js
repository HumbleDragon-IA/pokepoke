import axios from 'axios';

const API_URL = 'http://localhost:8081';

export const getAll = async () => {
    try{
    const { data:{ return: pokemon} } = await axios.get(`${API_URL}/pokemon`)
   
        return pokemon
    }
    catch(error) {
        console.error("Error Usuarios GET", error)
        return []
    }

    

};

export const put = async (id, pokemon) => {
    try {
        const { data: pokeActualizado } = await axios.put(+id, pokemon)
        return pokeActualizado
    }
    catch(error) {
        console.error("Error productos PUT:", error);
        return {}
    }
}


export const post = async pokemon  => {
    try{
    const { data: {return: pokemonGuardado} } = await axios.post(`${API_URL}/pokemon`,pokemon)
        return pokemonGuardado
    }
    catch(error) {
        console.error("Error Usuarios POST", error)
        return {}
    }


};

export const del = async (id)  => {
    try{
    const { data: pokeEliminado } = await axios.delete(+id)
        return pokeEliminado
    }
    catch(error) {
        console.error("Error Usuarios PUT", error)
        return {}
    }


};