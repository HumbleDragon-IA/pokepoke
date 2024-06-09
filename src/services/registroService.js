import axios from "axios";

const API_URL = "https://6664c599932baf9032ac0ce3.mockapi.io/final/";

class Registro {
  async register(nombre, email, password) {
    try {
      const response = await axios.post(`${API_URL}/users`, {
        nombre,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error("Error durante el registro.");
    }
  }

  async login(email, password) {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        params: {
          email,
          password,
        },
      });

      const usuario = response.data.find(
        (usuario) => usuario.email === email && usuario.password === password
      );

      if (usuario) {
        return usuario;
      } else {
        throw new Error("Email o contraseña incorrectos.");
      }
    } catch (error) {
      throw new Error("Email o contraseña incorrectos.");
    }
  }
  logout() {
    delete axios.defaults.headers.common['Authorization']; 
  }
}

export default new Registro();