<template>
<div >
     <v-chip text-color="white" class="text-md-body-1" color="orange">Semana Actual: {{semanaActual}}</v-chip>
     <v-chip text-color="white" class="text-md-body-1" color="blue">Avance Real: {{avance_proyecto}}%</v-chip>
</div>
</template>

<script>
export default {
    data (){
        return {
            semanaActual:null,
            avance_proyecto:null,
    }
  },
  created(){
    this.getEstadoActual();
  },
  methods:{
      getEstadoActual(){
          //console.log(this.$auth.user.tipo);
          this.$axios.get(`obras/estado/${this.$auth.user.id}`).then(resp=>{
              this.semanaActual = resp.data.semanaActual;
              this.avance_proyecto = resp.data.porc_avance;
          }).catch(e=>{
              console.log(e.getMessage());
          });
      }
  }
}
</script>

<style>

</style>