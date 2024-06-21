<template>
  <div>
    <button v-if="!this.globalStore.getLogueado" type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#loginModalCenter" id="login"
    >Login</button>
    <button v-if="this.globalStore.getLogueado" type="button" class="btn btn-outline-danger" @click="logout">Logout</button>
    
    <div class="modal fade" id="loginModalCenter" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content bg-dark">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form novalidate @submit.prevent="enviar">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" placeholder="Email" id="email" v-model="formData.email" @input="formDirty.email = true"/>
                <div v-if="!formData.email && formDirty.email" class="alert alert-danger mb-10">
                  Campo Requerido
                </div>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" placeholder="Password" id="password" v-model="formData.password" @input="formDirty.password = true"/>
                <div v-if="!formData.password && formDirty.password" class="alert alert-danger mt-1">
                  Campo Requerido
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div>
              No esta Registrado? <Registro></Registro>
            </div>
            <button type="button" class="btn btn-primary" @click="enviar" :disabled="!camposValidos()">
              Enviar
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useGlobalStore } from '@/stores/global.js'
import login from '../services/registroService';
import $ from 'jquery';
import Registro from './Register.vue'

export default {
  name: "login",  
  components: {
    Registro
  },
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
      formDirty: {
        email: false,
        password: false,
      },
      error: null,
      globalStore: useGlobalStore(),
    };
  },
  methods: {
    async enviar() {
      if (!this.camposValidos()) {
        return;
      }
      try {
        const { email, password } = this.formData;
        const {nameUsuario, tableroId, usuarioId, rolId} = await login.login(email, password);
        this.resetearFormulario();
        this.globalStore.setUsuario(usuarioId,tableroId,nameUsuario,rolId == 1,true)                        
        console.log('login exitoso');
        $('#loginModalCenter').modal('hide'); 
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },
    logout() {
      login.logout();
      this.globalStore.setUsuario(null,null,null,null,false)       
      this.$router.push('/')     
      console.log('logout exitoso');
    },
    resetearFormulario() {
      this.formData = {
        email: '',
        password: '',
      };
      this.formDirty = {
        email: false,
        password: false,
      };
    },
    camposValidos() {
      return this.formData.email && this.formData.password;
    }
  },
  mounted(){
  }
};
</script>

<style scoped>
.modal{
  color: white;
}
</style>
