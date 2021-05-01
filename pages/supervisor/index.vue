<template>
  <v-app>
      <v-container>
     <v-data-table
    :headers="headers"
    :items="tareas"
    :items-per-page="itemsPerPage"
    @click:row="listarSemanasByTarea"
    class="elevation-1"
  >
  </v-data-table>
    </v-container>


   <v-dialog
      v-model="semanasDialog"
      persistent
      max-width="80%"
      max-height="60%"
    >
    <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="semanasDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Avance Semanas</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-chip @click="agregarSemana()" class="ma-2" color="transparent"  text-color="white">
                                     <v-avatar left>
                                        <v-icon small>mdi-plus</v-icon>
                                    </v-avatar>
                                    Agregar Semana
                                </v-chip>
        </v-toolbar>
        <v-card outlined flat class="pa-3" v-for="s in semanasByTarea" :key=s.id>
                    <v-layout row wrap class="pa-4" style="border-left: 4px solid #3cd1c2;" >
                        <v-flex xs12 sm4 md4>
                            <div class="caption grey--text">Semana</div>
                            <div>{{s.semana}}</div>
                        </v-flex>
                         <v-flex xs12 sm4 md4>
                            <div class="caption grey--text">Porc Avance</div>
                           <!-- <div>{{s.trabajo_efectivo}}</div>-->
                            <v-text-field
                              v-model="s.trabajo_efectivo"
                            ></v-text-field>
                        </v-flex>
                         <v-flex xs12 sm4 md4>
                            <div class="caption grey--text">Acciones</div>
                            <div> 
                                <v-chip @click="guardarAvance(s)" class="ma-2" color="indigo" text-color="white">
                                     <v-avatar left>
                                        <v-icon small>mdi-content-save</v-icon>
                                    </v-avatar>
                                    Guardar
                                </v-chip>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-card>
    </v-dialog>

    <v-snackbar v-model="success" :timeout="2000" color="primary" top> 
        {{this.messageSuccess}}
      </v-snackbar>

       <v-snackbar v-model="error" :timeout="2000" color="red" top> 
        {{this.messageError}}
      </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data (){
    return {
      headers:[{text:'Nombre', value:'nombre'},{text:'Area',value:'area_responsable'}],
      headerSemana:[{text:'semana', value: 'semana'},{text:'Porc Avance', value:'trabajo_efectivo'}],
      semanasDialog:false,
      lastRow:0,
      semanasByTarea:[],
      tareas:[],
      itemsPerPage:5,
      singleExpand:true,
      expanded:[],
      success:false,
      messageSuccess:'',
      error:false,
      messageError:''
    }
  },
  watch: {

  },
  created(){
    this.getTareasByArea();

  },
  methods:{
    getTareasByArea(){
      this.$axios.get(`/tareas/area/${this.$store.state.auth.user.area_responsable}`).then(resp=>{
        console.log(resp.data);
        this.tareas = resp.data;
      }).catch(err=>{
        console.log(err.response.data.message);

      });

    },
    listarSemanasByTarea(row){
      this.lastRow = row;
      this.$axios.get(`/tareas/semanas/${row.id}`).then(resp=>{
        this.semanasByTarea = resp.data;
        this.semanasDialog = true;
       }).catch(err=>{
        console.log(err.response.data.message);
      });
     
      //mostrar modal
      //traerme sus semanas y listarlas
      //aun no se como lo voy a mostrar para la edicion 
      
    },
    guardarAvance(semana){
      this.$axios.post('tareas/semanas',semana).then(resp=>{
        this.semanasDialog = false;
        this.success = true;
        this.messageSuccess = "Porcentaje de avance actualizado correctamente";
       }).catch(err=>{
       
          this.error = true;
          this.messageError = "Porcentaje de avance no pudo actualizarse, intentelo nuevamente";
      });
    },
    agregarSemana(){
      let ultima_semana = this.semanasByTarea[this.semanasByTarea.length - 1]
      this.semanasByTarea.push({id:null,semana:ultima_semana.semana+1,trabajo_efectivo:0,tarea_id:this.lastRow.id});
    }

  }
    
}
</script>