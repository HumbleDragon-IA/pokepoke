<template>
  <div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content bg-dark">
        <div class="modal-header">
          <h5 class="modal-title">Error de Login</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>{{ error }}</p>
          <p>¿No estás registrado? <button type="button" class="btn btn-outline-primary" @click="closeAndOpenRegister">Registrarse</button></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "ErrorModal",
  props: {
    error: {
      type: String,
      required: true
    }
  },
  methods: {
    closeAndOpenRegister() {
      this.$emit('close-error-modal');
      $('#errorModal').modal('hide');
      $('#exampleModalCenter').modal('show');
      
    }
  }
};
</script>

<style scoped>
.modal {
  color: white;
}
</style>
