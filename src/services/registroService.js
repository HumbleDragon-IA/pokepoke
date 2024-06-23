import axios from "axios";

/* const API_URL = "https://6664c599932baf9032ac0ce3.mockapi.io/final/"; */
const API_URL = "http://localhost:8081";

class Registro {
  
  async register(name, mail, password) {
    try {
      const response = await axios.post(`${API_URL}/user`, {
        name,
        mail,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error("Error durante el registro.");
    }
  }

  async login(mail, password) {
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        mail,
        password,

      }, { withCredentials: true },);


      if (response.data.success) {
        return response.data.payload;
      } else {
        throw new Error("Email o contraseña incorrectos.");
      }
    } catch (error) {
      throw new Error("Email o contraseña incorrectos.");
    }
  }

  async logout() {
    try {
      const response = await axios.post(`${API_URL}/user/logout`, {}, { withCredentials: true });
      if (response.data.success) {
        delete axios.defaults.headers.common['Authorization'];
        return response.data.message

      }
      else { throw new Error(response.data.message) }
    }
    catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new Registro();