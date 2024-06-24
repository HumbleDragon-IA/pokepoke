<template>
  <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModalCenter" id="registro">Registrarse</button>
  <div
    class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content bg-dark">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Registrar</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form novalidate @submit.prevent="enviar">
            <!-- campo nombre -->
            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input type="text" class="form-control" placeholder="Nombre" id="nombre" v-model.trim="formData.nombre" @input="formDirty.nombre = true"/>
              <!-- validaciones nombre -->
              <div v-if="!formData.nombre && formDirty.nombre">
                <div v-if="!formData.nombre" class="alert alert-danger mt-1">Campo Requerido</div>
              </div>
              <div v-else-if="!validarNombre() && formDirty.nombre" class="alert alert-danger mt-1">
                <span>El campo debe tener entre 5 y 25 caracteres</span>
              </div>
            </div>
            <div class="form-group">
              <!-- campo email -->
              <label for="email">Email</label>
              <input type="email" class="form-control" placeholder="Email" id="email" v-model="formData.email" @input="formDirty.email = true"/>
              <!-- validaciones email -->
              <div v-if="!formData.email && formDirty.email" class="alert alert-danger mb-10">
                Campo Requerido
              </div>
              <div v-else-if="!validarMail() && formDirty.email" class="alert alert-danger mb-3">
                <span>El email ingresado es invalido</span>
              </div>
            </div>
            <div class="form-group">
              <!-- campo password -->
              <label for="password">Password</label>
              <input type="password" class="form-control" placeholder="Password" id="password" v-model="formData.password" @input="formDirty.password = true"/>
              <!-- validaciones password -->
              <div v-if="!formData.password && formDirty.password" class="alert alert-danger mt-1">
                Campo Requerido
              </div>
              <div v-else-if="!validarPassword() && formDirty.password" class="alert alert-danger mt-1">
                <span>Password invalida</span>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="enviar" :disabled="!camposValidos()">
            Enviar</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import registro from '../services/registroService';
import $ from 'jquery';

export default {
  components: {},
  name: "registro",
  props: [],
  data() {
    return {
      formData: this.getInitialData(),
      formDirty: this.getInitialData(),
      error: null
    };
  },
  methods: {
    getInitialData(){
      return {
        nombre: '',
        email: '',
        password: '',
      }
    },
    async enviar() {
      if (!this.camposValidos()) {
        return;
      }
      try {
        const { nombre, email, password } = this.formData;
        await registro.register(nombre, email, password);
        this.resetearFormulario();
        $('#exampleModalCenter').modal('hide');
      } catch (error) {
        this.error = error.message;
        console.error(error)
      }
    },
    resetearFormulario() {
      this.formData = this.getInitialData();
      this.formDirty = this.getInitialData();
    },
    validarNombre() {
      const nombre = this.formData.nombre;
      if (!nombre) {
        return false;
      }
      return nombre.length >= 5 && nombre.length <= 25;
    },
    validarMail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const email = this.formData.email;
      if (!email) {
        return false;
      }
      return regex.test(email);
    },
    validarPassword() {
      const password = this.formData.password;
      if (!password) {
        return false;
      }
      return password.length >= 5 && password.length <= 15;
    },
    camposValidos() {
      return this.validarNombre() && this.validarMail() && this.validarPassword();
    }
  }
};
</script>

<style scoped>
.modal{
  color: white;
}
</style>