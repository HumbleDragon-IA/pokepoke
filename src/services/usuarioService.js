import axios from 'axios';

const API_URL = 'http://localhost:8081';

const usuarioService = {
    async getAllUsuarios(id) {
        try{                     
            const { data:{ return: usuarios } } = await axios.get(`${API_URL}/user/all/${id}`)                             
            return usuarios
        }
        catch(error) {
            console.error("Error Usuarios GET ALL", error)
            return []
        }
    },
    async setAdmin(id){
        try{                                            
            const { data:{ message: message } } = await axios.put(`${API_URL}/user/admin/${id}`)                             
            return message
        }
        catch(error) {
            console.error("Error Usuarios PUT", error)
            return []
        }
    },
    async deleteUsuario(idAdmin,id){
        try{
            const {data: {message: message}} = await axios.delete(`${API_URL}/user/${idAdmin}/delete/${id}`)
            return message
        }
        catch(error){
            console.error("Error Usuarios DELETE",error)
            return []
        }
    }
}

export default usuarioService;