<template>
  <v-app>
      <v-container>
      <v-row justify="center">
        <v-col xs="12" sm="8" md="6" lg="4" xl="4">
          <v-card>
              <v-card-title class="justify-center">Seleccionar empresa</v-card-title>
              <v-card-text>
                  <v-form ref="obraform" v-model="obraValid" lazy-validation>
                    <v-select
                :items="obrasByGerente"
                v-model="obra"
                item-text="nombre"
                item-value="id"
                label="Obra*"
                :rules="rulesRequired">
              </v-select>
                 </v-form>
              </v-card-text>
              <v-card-actions >
          <v-btn class="mb-5" color="primary" tile outlined block @click="seleccionEmpresa">Seleccionar</v-btn>
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
    middleware: 'authenticated',
    data () {
        return {
            obrasByGerente:[],
            obraValid:false,
            obra:'',
            rulesRequired:[
                v => !!v  || 'Este campo es requerido'
            ],
        }
    },
    created() {
      this.getObrasByGerente();
    },
     methods: {
        getObrasByGerente(){
          this.$axios.get(`/obras/byGerente/${this.$auth.state.user.id}`).then(resp=>{
                this.obrasByGerente=resp.data;
            }); 

        },
        seleccionEmpresa(){
          this.$store.dispatch('selectObra',{obra:this.obra});
          this.$router.push(`/gerente/empresa/${this.obra}/`);
        },
}}
</script>