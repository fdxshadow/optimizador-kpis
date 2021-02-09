<template>
<v-container>
    <v-data-table :headers="columnas" :items="usuarios" class="elevation-19">
        
    </v-data-table>
</v-container>
</template>
<script>
export default {
    middleware: 'authenticated',
    data () {
        return {
            columnas:[
                {text:'Nombre', value:'nombre'},
                {text:'Email', value:'email'},
                {text:'Tipo', value:'tipo'},
                {text:'Password', value:'password'},
            ],
            usuarios:[]
        }
    },
    created() {
      this.getUsuarios();
      //this.getObras();
    },
    methods:{
        getUsuarios(){
            this.$axios.get("/usuarios").then(resp=>{
              console.log(resp.data);
                this.usuarios=resp.data;
            }); 
        }
    }
    
}
</script>