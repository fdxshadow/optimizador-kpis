<template>
<!--<v-container>
    <v-data-table :headers="columnas" :items="usuarios" class="elevation-19">
        
    </v-data-table>
</v-container>-->
 <div>
        <v-container class="my-5">
                <v-card outlined flat class="pa-3 my-2" v-for="usuario in usuarios" :key=usuario.id>
                    <v-layout row wrap class="pa-4" style="border-left: 4px solid #3cd1c2;" >
                        <v-flex xs12 md3 >
                            <div class="caption grey--text">Nombre</div>
                            <div>{{usuario.nombre}}</div>
                        </v-flex>
                        <v-flex xs12 sm4 md3>
                            <div class="caption grey--text">Email</div>
                            <div>{{usuario.email}}</div>
                        </v-flex>
                         <v-flex xs12 sm4 md3>
                            <div class="caption grey--text">Tipo</div>
                            <div>{{usuario.tipo}}</div>
                        </v-flex>
                        <v-flex xs12 sm4 md3>
                            <div class="caption grey--text">Acciones</div>
                            <div> 
                                <v-chip @click="editarUsuario(usuario.id)" class="ma-2" color="indigo" text-color="white">
                                     <v-avatar left>
                                        <v-icon small>mdi-pencil</v-icon>
                                    </v-avatar>
                                    Editar
                                </v-chip>
                                <v-chip  @click="eliminarUsuario(usuario.id)" class="ma-2" color="red" text-color="white">
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
        <v-dialog  persistent max-width="600px" v-model="eliminarUsuarioConfirm">
         <v-card>
            <v-card-title>
                <span  class="headline">Eliminar Usuario</span>
            </v-card-title>
            <v-card-text>
                Estas seguro de que quieres eliminar al usuario {{userDelete.nombre}} asociado al correo {{userDelete.email}}
                del tipo {{userDelete.tipo}}
            </v-card-text>
        <v-card-actions>
             <v-spacer></v-spacer>
            <v-btn
                color="indigo darken-1"
                text
                @click="eliminarUsuarioConfirm = false"
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

         <v-dialog  persistent max-width="600px" v-model="editarUsuarioModal">
         <v-card>
            <v-card-title>
                <span  class="headline">Editando Usuario</span>
            </v-card-title>
            <v-card-text>
                 <v-container>
            <v-form v-model="usuarioValid" lazy-validation>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Nombre usuario*"
                  v-model="usuarioUpdate.nombre"
                  :rules="rulesRequired"
                  required
                ></v-text-field>
                <v-text-field
                  label="Nombre empresa*"
                  v-model="usuarioUpdate.email"
                  :rules="rulesRequired"
                  required
                ></v-text-field>
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
                @click="editarUsuarioModal = false"
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
    </div>
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
            ],
            usuarios:[],
            userDelete:{},
            eliminarUsuarioConfirm:false,
            editarUsuarioModal:false,
            success:false,
            error:false,
            messageSuccess:'',
            messageError:'',
            rulesRequired:[
                v => !!v  || 'Este campo es requerido'
            ],
            usuarioValid:false,
            usuarioUpdate:{},
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
        },
        async eliminarUsuario(id){
            this.userDelete = await this.usuarios.find(e=>e.id==id);
            this.eliminarUsuarioConfirm = true;
        },
        async editarUsuario(id){
            this.usuarioUpdate = await this.usuarios.find(e=>e.id==id);
            this.editarUsuarioModal = true;

        },
        confirmDelete(){
            this.$axios.delete(`/usuarios/${this.userDelete.id}`).then(resp=>{
                this.usuarios=this.usuarios.filter(e=> e.id!=this.userDelete.id);
                this.eliminarUsuarioConfirm = false;
                this.messageSuccess="Usuario eliminado correctamente";
                this.success = true;
            }).catch(e=>{
                this.messageError="Problemas eliminado el usuario";
                this.error = true;

            })
        },
         confirmUpdate(){
            this.$axios.put(`/usuarios/${this.usuarioUpdate.id}`,{nombre:this.usuarioUpdate.nombre,email:this.usuarioUpdate.email}).then(async resp=>{
               this.usuarios=await this.usuarios.filter(e=> e.id!=this.usuarioUpdate.id);
               this.usuarios.push(this.usuarioUpdate);
               this.usuarios.sort((uA,uB)=> (uA.id > uB.index) ? 1 : -1);
               this.editarUsuarioModal = true;
               this.messageSuccess="Usuario actualizado correctamente";
            this.success = true;
            }).catch(e=>{
                 this.messageError="Problemas al actualizar usuario";
                this.error = true;

            })
        }
    }
    
}
</script>