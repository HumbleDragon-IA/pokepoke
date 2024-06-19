
import axios from 'axios';

const axiosInstance = axios.create({
   baseUrl: 'http://localhost:8081/'
    
});

export default axiosInstance;