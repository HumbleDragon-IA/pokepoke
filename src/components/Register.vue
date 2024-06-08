<template>
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" id="registro">Registrarse</button>
  <div
    class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Registrar</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form novalidate @submit.prevent="enviar()">
            <!-- campo nombre -->
            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input type="text" class="form-control" placeholder="Nombre" id="nombre" v-model.trim="formData.nombre" @input="formDirty.nombre = true"/>
              <!-- validaciones nombre -->
              <div v-if="!formData.nombre && formDirty.nombre">
                <span v-if="!formData.nombre" class="alert alert-danger mt-1">Campo Requerido</span>
              </div>
              <div v-else-if="!this.validarNombre() && formDirty.nombre" class="alert alert-danger mt-1">
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
              <div v-else-if="!this.validarMail() && formDirty.email" class="alert alert-danger mb-3">
                <span>El email ingresado es invalido</span>
              </div>
            </div>
            <div class="form-group">
              <!-- campo password -->
              <label for="Password">Password</label>
              <input type="password" class="form-control" placeholder="Password" id="password" v-model="formData.password" @input="formDirty.password = true"/>
              <!-- validaciones password -->
              <div v-if="!formData.password && formDirty.password" class="alert alert-danger mt-1">
                Campo Requerido
              </div>
              <div v-else-if="!this.validarPassword() && formDirty.password" class="alert alert-danger mt-1">
                <span>Password invalida</span>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" v-if="this.camposValidos()" @click="this.enviar()" :disabled="!this.camposValidos()">
            Enviar</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "registro",
  props: [],
  data() {
    return {
      formData: this.getInitialData(),
      formDirty: this.getInitialData()
    };
  },
  methods: {
    getInitialData(){
      return {
        nombre: null,
        email: null,
        password: null,
      }
    },
    enviar(){
      const datos = {...this.formData}
      console.log(datos)

      this.formData = this.getInitialData()
      this.formDirty = this.getInitialData()
    },
    validarNombre(){
      const nombre = this.formData.nombre
      if(!nombre){
        return false
      }
      return nombre.length >=5 && nombre.length <= 25
    },
    validarMail(){
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const email = this.formData.email
      if (!email) {
        return false;
      }
      return regex.test(email)
    },
    validarPassword(){
      const password = this.formData.password
      if(!password){
        return false
      }
      return password.length >= 5 && password.length <= 15
    },
    camposValidos(){
      return this.validarNombre()
      && this.validarMail() 
      && this.validarPassword()
    },
  },
};
</script>

<style scoped>
</style>
