<template>
 <!--<v-data-table :headers="columnas" :items="empresas" class="elevation-19">      
</v-data-table>-->
    <v-app>
        <v-container class="my-5">
                <v-card outlined flat class="pa-3 my-2" v-for="obra in obras" :key=obra.id>
                    <v-layout row wrap class="pa-4" style="border-left: 4px solid #3cd1c2;" >
                        <v-flex xs12 md3 >
                            <div class="caption grey--text">Nombre Obra</div>
                            <div>{{obra.nombre}}</div>
                        </v-flex>
                        <v-flex xs12 sm4 md3>
                            <div class="caption grey--text">Empresa Obra</div>
                            <div>{{obra.empresa.nombre}}</div>
                        </v-flex>
                        <v-flex xs12 sm4 md3>
                            <div class="caption grey--text">Fecha Inicio</div>
                            <div>{{(obra.fecha_inicio != null)?new Date(obra.fecha_inicio).toISOString().split('T')[0]:null }}</div>
                        </v-flex>
                        <v-flex xs12 sm4 md3>
                            <div class="caption grey--text">Acciones</div>
                            <div> 
                                <v-chip @click="editarObra(obra)" class="ma-2" color="indigo" text-color="white">
                                     <v-avatar left>
                                        <v-icon small>mdi-pencil</v-icon>
                                    </v-avatar>
                                    Editar
                                </v-chip>
                                <v-chip @click="eliminarObra(obra)"  class="ma-2" color="red" text-color="white">
                                    <v-avatar left>
                                        <v-icon small>mdi-delete</v-icon>
                                    </v-avatar>
                                    Eliminar
                                </v-chip>
                            </div>
                               
                        </v-flex>
                    </v-layout>
                </v-card>

        <v-snackbar v-model="success" :timeout="2000" color="primary" top> 
        {{this.messageSuccess}}
      </v-snackbar>

       <v-snackbar v-model="error" :timeout="2000" color="red" top> 
        {{this.messageError}}
      </v-snackbar>
        </v-container>

       <v-dialog  persistent max-width="600px" v-model="eliminarObraConfirm">
         <v-card>
            <v-card-title>
                <span  class="headline">Eliminar Usuario</span>
            </v-card-title>
            <v-card-text>
                Estas seguro de que quieres eliminar la empresa {{obraDelete.nombre}} asociado a la empresa {{obraDelete.empresa.nombre}}
            </v-card-text>
        <v-card-actions>
             <v-spacer></v-spacer>
            <v-btn
                color="indigo darken-1"
                text
                @click="eliminarObraConfirm = false"
            >
            Cancelar
          </v-btn>
          <v-btn
            color="error darken-1"
            text
            @click="confirmDelete"
          >
            Eliminar
          </v-btn>

        </v-card-actions>
        </v-card>
        </v-dialog>

         <v-dialog  persistent max-width="600px" v-model="editarObraConfirm">
         <v-card>
            <v-card-title>
                <span  class="headline">Editando Obra</span>
            </v-card-title>
            <v-card-text>
                 <v-container>
            <v-form v-model="obraValid" lazy-validation>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Nombre obra*"
                  v-model="obraEditar.nombre"
                  :rules="rulesRequired"
                  required
                ></v-text-field>

                <v-select 
                label="Empresa"
                :items="empresas"
                item-text="nombre"
                item-value="id"
                v-model="obraEditar.empresa"
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row>
                <v-col cols="12"
                sm="12">
                     <div class="subheading">
                        Fecha inicio obra
                    </div>
                    <v-date-picker locale="es" v-model="obraEditar.fecha_inicio" :rules="rulesRequired"></v-date-picker>
                </v-col>    
            </v-row>
            </v-form>
          </v-container>
            </v-card-text>
        <v-card-actions>
             <v-spacer></v-spacer>
            <v-btn
                color="error darken-1"
                text
                @click="cancelarUpdate"
            >
            Cancelar
          </v-btn>
          <v-btn
            color="indigo darken-1"
            text
            @click="confirmUpdate"
          >
            Confirmar
          </v-btn>

        </v-card-actions>
        </v-card>
        </v-dialog>
   </v-app>
</template>
<script>
export default {
    middleware: 'authenticated',
    data () {
        return {
            obras:[],
            obraDelete:{nombre:'', empresa: {}},
            obraEditar:{},
            empresas:[],
            eliminarObraConfirm:false,
            editarObraConfirm: false,
            obraEditarIndex:-1,
            success:false,
            error:false,
            messageSuccess:'',
            messageError:'',
            obraValid:false,
             rulesRequired:[
                v => !!v  || 'Este campo es requerido'
            ],

        }
    },
    created(){
        this.getObras();
        this.getEmpresas();

    },
    methods:{
        getObras(){
             this.$axios.get("/obras").then(resp=>{
                 this.obras = resp.data;
                 console.log(resp.data);
             });
        },
        eliminarObra(obra){
            this.obraDelete = obra;
            this.eliminarObraConfirm = true;
            
        },
        confirmDelete(){
            this.$axios.delete(`/obras/${this.obraDelete.id}`).then(resp=>{
                this.obras=this.obras.filter(o=> o.id!=this.obraDelete.id);
                this.eliminarObraConfirm=false;
                this.messageSuccess='Obra Eliminada correctamente';
                this.success = true;
            }).catch(e=>{
                this.messageError='No se pudo eliminar la obra';
                this.error = true;

            });
        },
        editarObra(obra){
            this.obraEditar = Object.assign({},obra);
            this.obraEditar['fecha_inicio']=(this.obraEditar['fecha_inicio']==null)?null:new Date(this.obraEditar['fecha_inicio']).toISOString().split('T')[0];
            this.obraEditarIndex = this.obras.indexOf(obra);
            this.editarObraConfirm=true;

        },
        confirmUpdate(){
            console.log(this.obraEditar);

            this.$axios.put(`/obras/${this.obraEditar.id}`,{nombre:this.obraEditar.nombre,fecha_inicio:this.obraEditar.fecha_inicio,empresa:this.obraEditar.empresa.id}).then(({data})=>{
                console.log(data);
                Object.assign(this.obras[this.obraEditarIndex],data);
                this.obraEditarIndex = -1;
                this.editarObraConfirm=false;
                this.messageSuccess="Obra actualizada correctamente";
                this.success = true;
            }).catch(e=>{
                this.messageError="Problemas al actualizar obra";
                this.error = true;
            });
        },
        cancelarUpdate(){
            this.obraUpdateIndex = -1;
            this.cambiarObras = false;
             this.editarObraConfirm=false;
        },

        getEmpresas(){
            this.$axios.get('/empresas').then(({ data })=>{
                this.empresas = data;
            }).catch(e=>{
                console.log(e);
            });
        },
    }
    
}
</script>