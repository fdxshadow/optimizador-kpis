<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 v-for="o in obrasByGerente" :key="o.id">
        <v-card color="#385F73"
            dark>
          <v-card-title class="text-h5">
             Nombre Obra: {{o.nombre}}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle>
            <div>Empresa: {{o.empresa.nombre}}</div>
            <div>Fecha Inicio Obra: {{new Date(o.fecha_inicio).toLocaleDateString()}}</div>  
          </v-card-subtitle>
          <v-card-actions>
            <v-chip text-color="white" outlined class="text-md-body-1" color="orange">Semana Actual: {{o.semana_actual}}</v-chip>
            <v-divider></v-divider>
            <v-chip text-color="white" outlined class="text-md-body-1" color="blue">Avance Real: {{o.porc_avance_real}}%</v-chip>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  
</template>

<script>
export default {
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
          if(this.$store.state.obrasGerente == null){
            this.$axios.get(`/obras/byGerente/${this.$auth.state.user.id}`).then(resp=>{
                this.obrasByGerente=resp.data;
                this.$store.state.obrasGerente=resp.data;
                console.log(resp.data);
            }); 

          }else{
            this.obrasByGerente = this.$store.state.obrasGerente;
          }
          

        },
        seleccionEmpresa(){
          this.$store.dispatch('selectObra',{obra:this.obra});
          this.$router.push(`/gerente/empresa/${this.obra}/`);
        },
}}
</script>