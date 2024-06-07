import axios from 'axios';

const API_BASE_URL = 'https://666122c663e6a0189fe89111.mockapi.io/pokemon/pokemones/';

export const getAll = async () => {
    try{
    const { data: pokemon } = await axios.get(API_BASE_URL)
    
        return pokemon
    }
    catch(error) {
        console.error("Error Usuarios GET", error)
        return []
    }

    

};

export const put = async (id, pokemon) => {
    try {
        const { data: pokeActualizado } = await axios.put(API_BASE_URL+id, pokemon)
        return pokeActualizado
    }
    catch(error) {
        console.error("Error productos PUT:", error);
        return {}
    }
}


export const post = async pokemon  => {
    try{
    const { data: pokemonGuardado } = await axios.post(API_BASE_URL, pokemon)
        return pokemonGuardado
    }
    catch(error) {
        console.error("Error Usuarios POST", error)
        return {}
    }


};

export const del = async (id)  => {
    try{
    const { data: pokeEliminado } = await axios.delete(API_BASE_URL+id)
        return pokeEliminado
    }
    catch(error) {
        console.error("Error Usuarios PUT", error)
        return {}
    }


};