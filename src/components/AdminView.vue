<template>
    <div class="jumbotron">
        <h5 id="title">Listado de Usuarios</h5>

        <table class="table table-dark">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Mail</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Rol</th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-for="(usuario, index) in usuarios" :key="index">
                <tr>
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ usuario.name }}</td>
                    <td>{{ usuario.mail }}</td>
                    <td>{{ usuario.Rol.name }}</td>
                    <td>
                        <button type="button" :disabled="usuario.Rol.name == 'admin'" class="add-btn"
                            @click="hacerAdmin(usuario.id)">Dar admin</button>
                        <button type="button" :disabled="usuario.Rol.name == 'admin'" class="add-btn"
                            @click="deleteUsuario(usuario.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
import usuarioService from '@/services/usuarioService.js';
import { useGlobalStore } from '@/stores/global.js'

export default {
    name: "adminview",

    data() {
        return {
            usuarios: [],
            globalStore: useGlobalStore(),
        };
    },
    mounted() {
        this.getUsuarios();
    },
    methods: {

        async getUsuarios() {
            const message = await usuarioService.getAllUsuarios(this.globalStore.getUsuarioId);
            this.usuarios = message;
        },

        async hacerAdmin(id) {
            await usuarioService.setAdmin(id);
            this.getUsuarios();
        },

        async deleteUsuario(id) {
            await usuarioService.deleteUsuario(this.globalStore.getUsuarioId, id);
            this.getUsuarios();
        }
    }
};
</script>

<style lang="css">
.jumbotron {
    background-color: #343A40;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

#title {
    color: white;
}

.add-btn {
    margin-bottom: 15px;
    background-color: greenyellow;
    border: 0px;
    font-weight: 650;
}
</style>
