<template>
  <v-app>
      <v-container>
      <v-row justify="center">
        <v-col xs="12" sm="8" md="6" lg="4" xl="4">
          <v-card>
              <v-card-title class="justify-center">Obra: {{obraInfo.obra}}</v-card-title>
              <v-card-text>
                Empresa: {{obraInfo.empresa}}
              </v-card-text>
              <v-card-actions >
          <v-btn class="mb-5" color="primary" tile outlined block @click="volverSeleccionarObra">Cambiar Obra</v-btn>
        </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  middleware: 'authenticated',
    data () {
        return {
            obraInfo:{
              empresa:'',
              obra:''
            },
            rulesRequired:[
                v => !!v  || 'Este campo es requerido'
            ],
        }
    },
    created() {
      this.getObraSeleccionada()
    },
     methods: {
        volverSeleccionarObra(){
          this.$store.dispatch('deleteObra');
          this.$router.push('/gerente/');
 
        },
        getObraSeleccionada(){
          this.$axios.get(`/obras/${this.$store.state.obraSelect}`).then(resp=>{
           this.obraInfo.empresa = resp.data.empresa.nombre;
           this.obraInfo.obra = resp.data.nombre;
          });
        },
}}
</script>