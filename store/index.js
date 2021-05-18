
//Mi store o almacenamiento
export const state = () => {
    obrasGerente: null
}
//Acceso a los datos
/*export const getters = {
    getObra(state) {
        return state.obraSelect;
    }
}*/


//Acciones, metodos publicos para llamar el mutations
export const actions = {
    loadObras({ commit },payload) {
        commit('setObra',payload.obra);
    },
    deleteObra({commit}) {
        commit('setObra',null);
    }
}


//modificar el almacenamiento
export const mutations = {
    setObra(state,obra) {
        state.obrasGerente = obra;
    },
}