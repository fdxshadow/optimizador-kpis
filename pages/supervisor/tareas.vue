<template>
  <v-app>
      <semana-act-porcent />
      <v-container>
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
      itemsPerPage:5
    }
  },
  watch: {

  },
  created(){
    this.getTareas();
  },
  methods:{
    getTareas(){
      this.$axios.get('/tareas/obra_usuario').then(resp=>{
        this.tareas = resp.data;
      }).catch(err=>{
        console.log(err.response.data.message);
      });

    }
  }
    
    
}
</script>