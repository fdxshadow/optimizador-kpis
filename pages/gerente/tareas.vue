<template>
  <v-app>
      <v-container>
          <v-select
                :items = this.$store.state.obrasGerente
                 item-text="nombre"
                 item-value="id"
                 label="Seleccione una Obra"
                 v-model="obraSeleccionada"
                >  
                </v-select>
      <v-data-table
        :headers="headers"
        :items="tareas"
        :items-per-page="itemsPerPage"
        class="elevation-1"
  ></v-data-table>
    </v-container>
  </v-app>
</template>

<script>
export default {
     data (){
    return {
      headers:[{text:'Nombre', value:'nombre'},{text:'Area',value:'area_responsable'}],
      tareas:[],
      itemsPerPage:5,
      obraSeleccionada:null,
    }
  },
  watch: {
    obraSeleccionada:function(){
      this.getTareas();
    }
  },
  fetch(){
    //this.getTareas();
  },
  methods:{
    getTareas(){
      this.$axios.get(`/tareas/byObra/${this.obraSeleccionada}`).then(resp=>{
        this.tareas = resp.data;
      }).catch(err=>{
        console.log(err.response.data.message);
      });

    }
  }
    
    
}
</script>