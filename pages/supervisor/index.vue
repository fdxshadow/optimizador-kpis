<template>
  <v-app>
     <semana-act-porcent />
      <v-container>
    <!-- <v-data-table
     mt-2
    :headers="headers"
    :items="tareas"
    :items-per-page="itemsPerPage"
    group-by="resumen"
    @click:row="listarSemanasByTarea"
    class="elevation-1"
  >-->

  <v-data-table
     mt-2
    :headers="headers"
    :items="tareas"
    :items-per-page="itemsPerPage"
    group-by="resumen"
    class="elevation-1">

  <template v-slot:item.avance_semana="props">
        <v-edit-dialog
          :return-value.sync="props.item.avance_semana"
          @save="guardarAvance(props)"
        >
          {{ props.item.avance_semana }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.avance_semana"
              label="Actualizar"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>






  </v-data-table>
    </v-container>


   <!--<v-dialog
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
                        <v-flex xs12 sm3 md3>
                            <div class="caption grey--text">Semana</div>
                            <div>{{s.semana}}</div>
                        </v-flex>
                         <v-flex xs12 sm3 md3>
                            <div class="caption grey--text">Avance Esperado</div>
                            <div>{{s.trabajo_efectivo}}</div>
            <div class="red--text">{{Number(s.carga_trabajo).toFixed(2)}}</div>
                        </v-flex>
                         <v-flex xs12 sm3 md3>
                            <div class="caption grey--text">Porc Avance </div>
                            <div>{{s.trabajo_efectivo}}</div>

                            <v-text-field v-if="s.trabajo_efectivo==0"
                              v-model="trabajoEfecMom"
                            ></v-text-field>-->
                            <!--<v-text-field
                              v-model="s.trabajo_efectivo"
                            ></v-text-field>

                             <div v-if="s.trabajo_efectivo>=0" class="blue--text">{{s.trabajo_efectivo}}</div>-->
                        <!--</v-flex>
                         <v-flex xs12 sm3 md3>
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
    </v-dialog>-->

    <v-snackbar v-model="success" :timeout="2000" color="primary" top> 
        {{this.messageSuccess}}
      </v-snackbar>

       <v-snackbar v-model="error" :timeout="2000" color="red" top> 
        {{this.messageError}}
      </v-snackbar>
  </v-app>
</template>

<script>
import SemanaActPorcent from '../../components/SemanaActPorcent.vue';
export default {
  components: { SemanaActPorcent },
  data (){
    return {
      headers:[{text:'Nombre', value:'nombre'},{text:'Fecha Inicio', value:'comienzo'},{text:'Fecha Fin',value:'fin'},{text:'% Esperado', value:'porc_esperado'},{text:'% Real', value:'porc_real'},{text:'Avance Semana Actual', value:'avance_semana'}, {text:"Tarea Resumen", value:'resumen'}],
      headerSemana:[{text:'semana', value: 'semana'},{text:'Avance Esperado',value:'carga_trabajo'},{text:'Avance Real', value:'trabajo_efectivo'}],
      semanasDialog:false,
      //trabajoEfecMom
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
      this.$axios.get(`/tareas/area/${this.$store.state.auth.user.area_responsable}/${this.$store.state.semanaActual}`).then(resp=>{
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
      const {id,avance_semana} = semana.item;
      console.log(id,avance_semana);
      this.$axios.post('tareas/semanas',{id,avance_semana,semana_actual:this.$store.state.semanaActual}).then(({data})=>{
        if(data['nuevo_porc_real']) this.tareas.find(t=> t.id==id).porc_real =data['nuevo_porc_real'];
        this.semanasDialog = false;
        this.success = true;
        this.messageSuccess = "Porcentaje de avance actualizado correctamente";
       }).catch(({response})=>{
          this.error = true;
          this.messageError = response.data.message;
      });
    },
    agregarSemana(){
      let ultima_semana = this.semanasByTarea[this.semanasByTarea.length - 1]
      this.semanasByTarea.push({id:null,semana:ultima_semana.semana+1,trabajo_efectivo:0,tarea_id:this.lastRow.id});
    }

  }
    
}
</script>