<template>
    <v-container>
        <v-card>
        <v-card-title>
          <span class="headline">Cargar Planificacion</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="planform" v-model="planiValid" lazy-validation>
              <v-row>
              <v-col
                cols="12"
                sm="12"
              >
                <v-select
                  v-model="planificacion.empresa"
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
                <v-select
                  v-model="planificacion.obra"
                  :items=obras
                  item-text="nombre"
                  item-value="id"
                  label="Obra *"
                  :rules="rulesRequired"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="12"
              >
                <v-file-input
                    v-model="planificacion.archivo"
                    accept=".xlsx"
                    placeholder="Cargar Excel *"
                    :rules="fileRules"
                    required
                ></v-file-input>
              </v-col>
            </v-row>
            </v-form>
          </v-container>
          <small>* indica los campos requeridos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled=!planiValid
            color="blue darken-1"
            text
            @click="cargarExcel"
          >
            Cargar
          </v-btn>
        </v-card-actions>
      </v-card>


      <v-dialog
      v-model="loading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Procesando planificacion
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

      <v-snackbar v-model="success" :timeout="2000" color="primary" top> 
        {{this.messageSuccess}}
      </v-snackbar>

       <v-snackbar v-model="error" :timeout="2000" color="red" top> 
        {{this.messageError}}
      </v-snackbar>

    </v-container>
</template>
<script>
export default {
    middleware: 'authenticated',
    data(){
        return{
            planiValid:false,
            planificacion:{},
            loading:false,
            success:false,
            error:false,
            messageSuccess:'',
            messageError:'',
            empresas:[],
            obras:[],
            rulesRequired:[
                v => !!v  || 'Este campo es requerido'
            ],
            fileRules:[
                v => !!v || 'Es necesario un archivo para continuar'
            ]
        }
    },
    watch:{
     'planificacion.empresa': function (empresa){
        console.log("Obteniendo obras por empresa",empresa);
        this.getObras(empresa);
      }
    },
    created(){
        this.getEmpresas();
    },
    methods: {
        cargarExcel(){
            console.log(this.planificacion.archivo);
            console.log(this.planificacion.archivo.name);
            if(this.$refs.planform.validate()){
                this.loading = true;
                console.log("Cargando excel");
                const formData = new FormData()
                formData.append('planificacion', this.planificacion.archivo, this.planificacion.archivo.name)
                formData.append('obra', this.planificacion.obra)
                this.$axios.post("/planificacion",formData).then(resp=>{
                    console.log(resp);
                    this.loading = false;
                    this.success = true;
                    this.messageSuccess = "Planifiacion cargada correctamente";
                }).catch(err=>{
                    console.log(err);
                    this.loading = false;
                    this.error = true;
                    this.messageError = err.response.data.message;
                });
            }
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
    }
    
}
</script>