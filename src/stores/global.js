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
        setUsuarioId(value){
            this.usuarioId = value
        },
        setTableroId(value){
            this.tableroId = value
        },
        setNameUsuario(value){
            this.nameUsuario = value
        },
        setEsAdmin(value){
            this.esAdmin = value
        },
        setLogueado(value){
            this.logueado = value
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