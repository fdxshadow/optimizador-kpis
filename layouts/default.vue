<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="secondary"
    >
    <v-layout column align-center>
               <v-flex class="mt-5"> 
                    <v-avatar size="100">
                            <img src="/img1.png" alt="">
                    </v-avatar>
                    <p class="white--text subheading mt-1 text-center">Hola {{this.$auth.state.user.nombre}}</p>
               </v-flex>
               <v-flex class="mt-4 mb-4" v-if="this.$auth.state.user.tipo=='administrador'">
                 <v-btn @click="dialogAgregar = true" color="primary">Agregar Empresa</v-btn>
               </v-flex>
    </v-layout>
      <v-list color="secondary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="secondary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
        <v-btn class="white--text"  @click="logout" outlined v-if="$auth.loggedIn">
       <v-icon>mdi-logout</v-icon>Cerrar Sesion</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
<!--Dialogo Agregar -->
  <v-dialog
      v-model="dialogAgregar"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Nueva Empresa</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="empresaForm" v-model="empresaValid" lazy-validation>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Nombre empresa*"
                  v-model="empresaNombre"
                  :rules="rulesRequired"
                  required
                ></v-text-field>
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
            @click="dialogAgregar = false"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            :disabled="!empresaValid"
            text
            @click="agregarEmpresa"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <v-snackbar v-model="addEmpresaSuccess" :timeout="2000" color="success" top> 
        Empresa creada correctamente
      </v-snackbar>

      <v-snackbar v-model="addEmpresaError" :timeout="2000" color="error" top> 
        {{this.messageError}}
      </v-snackbar>
  <!--Cierre Dialogo Agregar -->
  </v-app>



</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      dialogAgregar: false,
      items: this.getItemsNavBar(),
      miniVariant: false,
      right: true,
      rightDrawer: true,
      empresaNombre:'',
      empresaValid:false,
      addEmpresaSuccess:false,
      addEmpresaError:false,
      messageError:'',
       rulesRequired:[
          v => !!v  || 'Este campo es requerido'
        ],
    }},
methods:{
  getItemsNavBar() {
    switch (this.$auth.state.user.tipo) {
      case 'administrador':
        return [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/administrador',
        },
        {
          icon: 'mdi-account',
          title: 'Usuarios',
          to: '/administrador/usuarios',
        },
         {
          icon: 'mdi-truck',
          title: 'Obras',
          to: '/administrador/obras',
        },
         {
          icon: 'mdi-file-excel-box',
          title: 'Planificacion',
          to: '/administrador/planificacion',
        }
      ];
        break;
      case 'gerente':
        return [{
          icon: 'mdi-home',
          title: 'Home',
          to: `/gerente/empresa/${this.$store.state.obraSelect}`,
        },
        {
          icon: 'mdi-account',
          title: 'Avance por Tipo',
          to: '/gerente/avance_tipo',
        },
         {
          icon: 'mdi-account',
          title: 'Ruta Critica',
          to: '/gerente/ruta_critica',
        },
         {
          icon: 'mdi-account',
          title: 'Curva S',
          to: '/gerente/curva_s',
        },
         {
          icon: 'mdi-account',
          title: 'Variacion %',
          to: '/gerente/avance_tipo',
        },
         {
          icon: 'mdi-truck',
          title: 'Tareas',
          to: '/gerente/tareas',
        }]
        break;
      case 'supervisor':
         return [{
          icon: 'mdi-home',
          title: 'Mis Tareas',
          to: '/serie',
        }]
        break;  
      default:
        break;
    }
  },
  logout(){
     this.$store.dispatch('deleteObra');
     this.$auth.logout();
  },
  agregarEmpresa(){
    console.log("guardar empresa");
    this.$axios.post('/empresas',{nombre:this.empresaNombre}).then(resp=>{
      this.dialogAgregar = false;
      this.addEmpresaSuccess = true;
      console.log(resp);
    }).catch(e=>{
      this.addEmpresaSuccess = true;
      this.messageSuccess = e.response.data.message;
    })

  }
}
}
</script>