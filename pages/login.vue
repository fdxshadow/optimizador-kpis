<<template>
  <v-app>
      <v-container>
      <v-row justify="center">
        <v-col xs="12" sm="8" md="6" lg="4" xl="4">
          <v-card>
              <v-card-title class="justify-center">Logo</v-card-title>
              <v-card-text>
                  <v-form
                  <v-text-field 
              v-model="loginEmail" 
              label="Email" 
              prepend-icon="mdi-account-circle"
              placeholder=""
            ></v-text-field>
            <v-text-field 
              v-model="loginPassword"
              :type="showPassword? 'text' : 'password'" 
              label="Contraseña"
              prepend-icon="mdi-lock"
              :append-icon="showPassword? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              placeholder=""
            ></v-text-field></v-form>
              </v-card-text>
              <v-card-actions >
          <v-btn class="mb-5" color="primary" tile outlined block @click="login">Ingresar</v-btn>
        </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
    layout: "login",
    auth: false,
    middleware: 'authenticated',
    data () {
    return {
      showPassword: false,
      loginEmail: '',
      loginPassword: '',
    }
  },
  methods: {
    async login() {
      this.$auth.loginWith('local',{data:{email: this.loginEmail,password: this.loginPassword}})
      .then(response =>{
        this.$router.push(`/${response.data.tipo}`);
        //this.$auth.setUser(response.data);
      }).catch(error=>{
        console.error(error);
      });
    }

        /*return this.$axios.post("/usuarios/login",{
          email: this.loginEmail,
          password: this.loginPassword
        })
        .then(resp => {
         const usuario = resp['data'];
        this.$store.commit({type:'login',usuario});
         console.log(usuario);
         switch ( usuario.tipo ) {
           case 'gerente':
              this.$router.push('/gerente');            
             break;
           case 'administrador':
              this.$router.push('/administrador');
              break;
           case 'serie':
              this.$router.push('/serie');
              break;
           default:
             break;
         }

          /*if(res.data.data.token){
            const auth = {
                Email: this.loginEmail,
                Info: res.data.data.info,
                Proyecto: {},
                Token: res.data.data.token
            }
            this.$axios.setToken(auth['Token'], 'Bearer')

            this.loginEmail = ''
            this.loginPassword = ''
            this.$store.commit('setAuth', auth) // mutating to store for client rendering

            // var date = new Date();
            // date.setTime(date.getTime() + (2*60*1000) ); //2 minutos
            // console.log("date:",date)
            // Cookie.set('auth', auth, {expires: date}) //tiempo espacificado en date
            
            Cookie.set('auth', auth, {expires: 15}) //15 días
            if(res.data.data.info['proyecto_admin'].length == 1){
              this.$axios.get(`/backend/Proyecto/${res.data.data.info.proyecto_admin[0]}/`)
              .then(resp => {
                console.log(resp)
                this.$store.commit('setProject', resp.data) //Se almacena en el estado de vuex, pero se puede perder con refresh
                Cookie.set('auth', this.$store.state.auth) //Se guarda en las cookie para no perder el estado en un refresh
                this.$router.push('/')
              })
              
            }else{
              this.$router.push('/seleccion_proyecto')
            }
            
            console.log("credenciales validadas correctamente")
          }*/
        //})
        /*.catch(error => {
          console.log("error: ", error.response.data)
          this.snack = true
          this.snackColor = 'error'
          this.snackText = 'El email o contraseña no son correctos'
        });
    }*/

  },

}
</script>

<style>

</style>