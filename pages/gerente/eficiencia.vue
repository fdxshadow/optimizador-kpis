<template>
  <v-app>
      <v-container>
         <line-chart v-if="loaded" :data="barChartData" :options="barChartOptions" :height="200" />
    </v-container>
  </v-app>
</template>

<script>
export default {
  middleware: ['authenticated','gerente'],
  data() {
    return {
      loaded:false,
      labels:null,
      datareal:null,
      dataprogramada:null,
      barChartData: null,
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
  
  created(){
    this.getDataCurvaS();
  },
  methods:{
    getDataCurvaS(){
      console.log("se ejecuta");
      this.$axios.get(`http://localhost:4000/planificacion/eficiencia/${this.$store.state.obraSelect}`).then(resp=>{
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
              data: data.eficiencia,
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