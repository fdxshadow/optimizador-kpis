<template>
<v-container class="my-5">
    <v-layout row wrap>
       <v-flex xs12 sm12 md4 lg4 xl4>
            <v-card class="ma-3" @click=" showModalObras">
                <v-list-item>
                    <v-list-item-avatar tile class="mt-n7">
                        <v-sheet color="info" width="100" height="100" elevation="10">
                            <v-icon color="white" md>mdi-truck</v-icon>
                        </v-sheet>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <div class="text-right"> Crear Obras</div>
                    </v-list-item-content> 
                </v-list-item>
                <v-responsive class="pt-4">
                <img src="">
            </v-responsive>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md4 lg4 xl4>
            <v-card class="ma-3" @click="goToPlanificacion">
                <v-list-item>
                    <v-list-item-avatar tile class="mt-n7">
                        <v-sheet color="info" width="100" height="100" elevation="10">
                            <v-icon color="white" md>mdi-file-excel-box</v-icon>
                        </v-sheet>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <div class="text-right">Cargar Planificación</div>
                    </v-list-item-content> 
                </v-list-item>
                <v-responsive class="pt-4">
                <img src="">
            </v-responsive>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md4 lg4 xl4>
            <v-card class="ma-3" @click="modalUsuario=true">
                <v-list-item>
                    <v-list-item-avatar tile class="mt-n7">
                        <v-sheet color="info" width="100" height="100" elevation="10">
                            <v-icon color="white" md>mdi-account</v-icon>
                        </v-sheet>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <div class="text-right">Crear Usuarios</div>
                    </v-list-item-content> 
                </v-list-item>
                <v-responsive class="pt-4">
                <img src="">
            </v-responsive>
            </v-card>
        </v-flex>
    </v-layout>
    <!--Dialog Obras -->
     <v-dialog
      v-model="modalObras"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Nueva Obra</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="obraform" v-model="obraValid" lazy-validation>
              <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Nombre Obra"
                  v-model="obraNueva.nombre"
                  :rules="rulesRequired"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  v-model="obraNueva.empresa"
                  :items=empresas
                  item-text="nombre"
                  item-value="id"
                  label="Empresa *"
                  :rules="rulesRequired"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="12"
              >
              <div class="subheading">
                Fecha inicio obra
              </div>
             
                <v-date-picker locale="es" v-model="obraNueva.fecha_inicio" :rules="rulesRequired"></v-date-picker>
              </v-col>
            </v-row>
            </v-form>
          </v-container>
          <small>* indica los campos requeridos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="modalObras = false"
          >
            Cerrar
          </v-btn>
          <v-btn
            :disabled="!obraValid"
            color="blue darken-1"
            text
            @click="crearObra"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
     </v-dialog>

    <!--Fin Obras -->

    <!--Dialog Usuarios -->
     <v-dialog
      v-model="modalUsuario"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Nuevo Usuario</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="userform" v-model="userValid" lazy-validation>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="usuario.nombre"
                  label="Nombre*"
                  :rules="rulesRequired"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="usuario.email"
                  label="Email*"
                  :rules="rulesEmail"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="usuario.password"
                  label="Password*"
                  type="password"
                  :rules="rulesRequired"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  v-model="usuario.tipo"
                  :items="['administrador', 'gerente', 'supervisor']"
                  label="Tipo*"
                  :rules="rulesRequired"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
              <v-select
                v-if="usuario.tipo=='supervisor' || usuario.tipo=='gerente'"
                :items=empresas
                v-model="empresaForObra"
                item-text="nombre"
                item-value="id"
                label="Empresa*"
                :rules="rulesRequired">
              </v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
              <v-select
                v-if="usuario.tipo=='supervisor'"
                :items=obras
                v-model="userObrasSelect"
                item-text="nombre"
                item-value="id"
                label="Obra*"
                :rules="rulesRequired">
              </v-select>
                <v-autocomplete
                  v-if="usuario.tipo=='gerente'"
                  :items=obras
                  v-model="usuario.obras"
                  item-text="nombre"
                  item-value="id"
                  label="Obra*"
                  multiple
                  :rules="rulesRequired"
                ></v-autocomplete>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  v-if="usuario.tipo=='supervisor'"
                  :items=areas
                  v-model="area_responsable"
                  item-text="nombreArea"
                  item-value="nombreArea"
                  label="Area responsable*"
                  :rules="rulesRequired">
                </v-select>
            </v-col>
            </v-row>
            </v-form>

            
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="modalUsuario = false"
          >
            Cerrar
          </v-btn>
          <v-btn
            :disabled="!userValid"
            color="blue darken-1"
            text
            @click="crearUsuario"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
     </v-dialog>

      <v-snackbar v-model="success" :timeout="2000" color="primary" top> 
        {{this.messageSuccess}}
      </v-snackbar>

       <v-snackbar v-model="error" :timeout="2000" color="red" top> 
        {{this.messageError}}
      </v-snackbar>

    <!--Fin Usuarios -->
</v-container>
</template>

<script>
export default {
    middleware: 'authenticated',
    data () {
        return {
        modalUsuario: false,
        modalObras : false,
        empresas:[],
        obras:[],
        userObrasSelect:null,
        areas:[],
        area_responsable:null,
        usuario:{},
        obraNueva:{},
        userValid:false,
        obraValid:false,
        empresaForObra:'',
        success:false,
        error:false,
        messageSuccess:'',
        messageError:'',
        rulesRequired:[
          v => !!v  || 'Este campo es requerido'
        ],
        rulesEmail: [
        v => !!v || 'Campo Email es requerido',
        v => /.+@.+\..+/.test(v) || 'Campo Email no es valido',
        ],
        }
    },
    watch:{
      empresaForObra: function (empresa){
        if(empresa!=null){            
          this.getObras(empresa);
        }
      },
      userObrasSelect: function (obra){
        if(obra!=null){
          this.usuario['obras']=obra;
          this.getAreasByObra(obra);
        }
      }
    },
    created() {
      this.getEmpresas();
      //this.getObras();
    },
     methods: {
        goToPlanificacion() {
           this.$router.push('/administrador/planificacion');
        },
         getEmpresas(){
            this.$axios.get("/empresas").then(resp=>{
              console.log(resp.data);
                this.empresas=resp.data;
            }); 
        },
        getObras(empresa){
          this.$axios.get(`/obras/byEmpresa/${empresa}`).then(resp=>{
                this.obras=resp.data;
            }); 

        },
        crearUsuario(){
          if(this.$refs.userform.validate()){
            let {nombre,email,password,tipo,obras} = this.usuario;
          this.$axios.post("usuarios/registro",{nombre,email,password,tipo,obras,area_responsable:this.area_responsable}).then(resp=>{
                this.modalUsuario = false;
                this.success = true;
                this.messageSuccess = "Usuario Creado";
                this.$refs.userform.reset();
                this.$refs.userform.resetValidation();
            }).catch(err=>{
              this.error = true;
              this.messageError = err.response.data.message;
              console.log(err.response.data);
            });
          }
          
        },
        crearObra(){
          if(this.$refs.obraform.validate()){
            let {nombre, empresa,fecha_inicio} = this.obraNueva;
            this.$axios.post("/obras",{nombre,empresa,fecha_inicio}).then(resp=>{
              this.modalObras = false;
              this.success = true;
                this.messageSuccess = "Obra Creada";
              this.$refs.obraform.reset();
              this.$refs.obraform.resetValidation();
            }).catch(err=>{
              this.error = true;
              this.messageError = err.response.data.message;
              console.log(err.response.data);
            });
          }
        },
        showModalObras(){
          this.modalObras = true;
          this.getEmpresas();
        },
        getAreasByObra(obra_id){
          this.$axios.get(`/obras/areas/${obra_id}`).then(resp=>{
            this.areas = resp.data;
            console.log(resp);
         }).catch(err=>{
              this.error = true;
              this.messageError = err.response.data.message;
              this.areas = [];
              console.log(err.response.data);
            });
        }
    }
    
}
</script>
