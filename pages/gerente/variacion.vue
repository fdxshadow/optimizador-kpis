<template>
  <v-app>
      <v-container>
          <div>
            <v-select
                :items = this.$store.state.obrasGerente
                 item-text="nombre"
                 item-value="id"
                 label="Seleccione una Obra"
                 v-model="obraSeleccionada"
                >  
                </v-select>
             <v-select
                  :items= semanas
                  label="Semana"
                  v-model="semanaSeleccionada"
                ></v-select>
          </div>


         <pie-chart v-if="loaded" :chart-data="ChartData" :options="ChartOptions"  :height="200"/>
    </v-container>
  </v-app>
</template>

<script>
export default {
    middleware: ['authenticated'],
    data() {
        return {
        loaded:true,
        semanas:this.getSemanas(),
        semanaSeleccionada:1,
        obraSeleccionada:1,
        ChartData: {
                    labels: ["test","test1","test2"],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [300,300,400],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 3
                    }],
                },
        ChartOptions: {
        responsive: true,
        legend: {
          display: true
        },
        title: {
          display: true,
          text: 'Variacion %',
          fontSize: 24,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#17BF62'
        },
      }
    }
    },
    watch:{
        semanaSeleccionada: function(semana){
            console.log(semana);
            this.getVariacion(semana);
        },
        obraSeleccionada: function(obra){
          let objetoObra=this.$store.state.obrasGerente.filter(ob=> ob.id==obra)[0];
          this.semanaSeleccionada = objetoObra.semana_actual;
        }
    },
    mounted(){
        if (this.$store.state.obrasGerente == null) {
          this.$router.push('/gerente');
          
        }
    },
    methods:{
        getVariacion(sem){
            this.$axios.get(`http://localhost:4000/planificacion/variacion/${this.obraSeleccionada}/${sem}`).then(async resp=>{
              console.log(resp.data);
                this.ChartData =  {
                    labels: await resp.data.map(r=>r.area_responsable),
                    datasets: [{
                        data: this.variacionToPercent(resp.data),  //resp.data.map(r=>r.porcVariacion),
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 3
                    }]
                };
               this.loaded = true;
            });
        },
        genColors(largo){
        },
        getSemanas(largo){
            return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
                    21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,
                    40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]
        },
        variacionToPercent(variaciones){
          let total = variaciones.reduce((curr,next)=>{
            return {porcVariacion:curr.porcVariacion + next.porcVariacion};
          });

          return variaciones.map(r=> {
            return (r.porcVariacion*100)/total.porcVariacion;
          });

        }
    }
}
</script>