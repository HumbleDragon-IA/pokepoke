
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0',

});

export default axiosInstance;