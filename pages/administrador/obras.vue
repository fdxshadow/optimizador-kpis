<template>
 <!--<v-data-table :headers="columnas" :items="empresas" class="elevation-19">      
</v-data-table>-->
    <div>
        <v-container class="my-5">
                <v-card outlined flat class="pa-3 my-2" v-for="obra in obras" :key=obra.id>
                    <v-layout row wrap class="pa-4" style="border-left: 4px solid #3cd1c2;" >
                        <v-flex xs12 md4 >
                            <div class="caption grey--text">Nombre Obra</div>
                            <div>{{obra.nombre}}</div>
                        </v-flex>
                        <v-flex xs12 sm4 md4>
                            <div class="caption grey--text">Empresa Obra</div>
                            <div>{{obra.empresa.nombre}}</div>
                        </v-flex>
                        <v-flex xs12 sm4 md4>
                            <div class="caption grey--text">Acciones</div>
                            <div> 
                                <v-chip class="ma-2" color="indigo" text-color="white">
                                     <v-avatar left>
                                        <v-icon small>mdi-pencil</v-icon>
                                    </v-avatar>
                                    Editar
                                </v-chip>
                                <v-chip  class="ma-2" color="red" text-color="white">
                                    <v-avatar left>
                                        <v-icon small>mdi-delete</v-icon>
                                    </v-avatar>
                                    Eliminar
                                </v-chip>
                            </div>
                               
                        </v-flex>
                    </v-layout>
                </v-card>
        </v-container>
    </div>
</template>
<script>
export default {
    middleware: 'authenticated',
    data () {
        return {
            obras:[]
        }
    },
    created(){
        this.getObras();

    },
    methods:{
        getObras(){
             this.$axios.get("/obras").then(resp=>{
                 this.obras = resp.data;
             });
        }
    }
    
}
</script>