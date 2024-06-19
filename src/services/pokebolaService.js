import axiosInstance from '../axios.js';

/* const asd = 'http://localhost:8081/'; */

export const getAll = async () => {
    try{
    const { data: pokemon } = await axiosInstance.get()
    
        return pokemon
    }
    catch(error) {
        console.error("Error Usuarios GET", error)
        return []
    }

    

};

export const put = async (id, pokemon) => {
    try {
        const { data: pokeActualizado } = await axiosInstance.put(+id, pokemon)
        return pokeActualizado
    }
    catch(error) {
        console.error("Error productos PUT:", error);
        return {}
    }
}


export const post = async pokemon  => {
    try{
    const { data: pokemonGuardado } = await axiosInstance.post( pokemon)
        return pokemonGuardado
    }
    catch(error) {
        console.error("Error Usuarios POST", error)
        return {}
    }


};

export const del = async (id)  => {
    try{
    const { data: pokeEliminado } = await axiosInstance.delete(+id)
        return pokeEliminado
    }
    catch(error) {
        console.error("Error Usuarios PUT", error)
        return {}
    }


};