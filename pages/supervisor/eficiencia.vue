<template>
  <v-app>
     <semana-act-porcent />
      <v-container>

         <div>
             <v-select
                  :items= semanas
                  label="Semana"
                  v-model="semanaSeleccionada"
                ></v-select>
          </div>
         <line-chart v-if="loaded" :chart-data="barChartData" :options="barChartOptions" :height="200" />
    </v-container>
  </v-app>
</template>

<script>
export default {
  middleware: ['authenticated'],
  data() {
    return {
      loaded:false,
      labels:null,
      datareal:null,
      dataprogramada:null,
      obraSeleccionada:this.$auth.user.obra.id,
      semanaSeleccionada:this.$store.state.semanaActual,
      semanas: Array.from({length: 60}, (_, i) => i + 1),
      barChartData: {
          labels: ['A','B','C'],
          datasets: [
            {
              label: 'Optimo',
              data: [1,2,3],
              lineTension: 0,
              fill: false,
              borderColor: 'green'
              //backgroundColor: 'green'
            },
            {
              label: 'Eficiencia',
              data: [1,2,3],
              lineTension: 0,
              fill: false,
              borderColor: 'blue'
              //backgroundColor: 'blue'
            },
          ]
        },
      barChartOptions: {
        responsive: true,
        legend: {
          display: true
        },
        title: {
          display: true,
          text: '% EFICIENCIA',
          fontSize: 24,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#17BF62'
        },
        scales: {
          xAxes: [
            { 
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Semanas',
                fontSize: 20,

              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Porcentaje',
                fontSize: 18
              }
            }
          ]
        }
      }
    }
  },
   watch:{
        semanaSeleccionada: function(semana){
            this.getEficiencia();
        }
    },
  created(){
    this.getEficiencia();
  },
  methods:{
    getEficiencia(){
      console.log("se ejecuta");
      this.$axios.get(`/planificacion/eficiencia/${this.obraSeleccionada}`).then(resp=>{
        let data = resp.data;
        this.barChartData = {
          labels: data.labels,
          datasets: [
            {
              label: 'Optimo',
              data: data.arregloBase,
              lineTension: 0,
              fill: false,
              borderColor: 'green'
              //backgroundColor: 'green'
            },
            {
              label: 'Eficiencia',
              data: data.eficiencia.slice(0,this.semanaSeleccionada),
              lineTension: 0,
              fill: false,
              borderColor: 'blue'
              //backgroundColor: 'blue'
            },
          ]
        };
        this.loaded = true;
      })
      
    }
  }
}
</script>