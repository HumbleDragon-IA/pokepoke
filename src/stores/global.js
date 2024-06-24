import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
    state: () => ({
        usuarioId: null,
        tableroId: null,
        nameUsuario: null,
        esAdmin: false,
        logueado: false,
    }),
    actions:{
        setUsuario(usuarioId,tableroId,nameUsuario,esAdmin,logueado){
            this.usuarioId = usuarioId
            this.tableroId = tableroId
            this.nameUsuario = nameUsuario
            this.esAdmin = esAdmin
            this.logueado = logueado
        }       
    },
    getters:{
        getUsuarioId: state => state.usuarioId,
        getTableroId: state => state.tableroId,
        getNameUsuario: state => state.nameUsuario,
        getEsAdmin: state => state.esAdmin,
        getLogueado: state => state.logueado
    }
})