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
          text: 'Curva S',
          fontSize: 24,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#17BF62'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Semanas',
                fontSize: 20,
                fontColor:"black"

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
                fontSize: 20,
                fontColor:"black"

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
      this.$axios.get(`http://localhost:4000/planificacion/curva_s/${this.$store.state.obraSelect}`).then(resp=>{
        let data = resp.data;
        this.barChartData = {
          labels: data.labels,
          datasets: [
            {
              label: 'Avance Real',
              data: data.dataReal,
              lineTension: 0,
              fill: false,
              borderColor: 'red'
              //backgroundColor: '#003f5c'
            },
            {
              label: 'Avance Esperado)',
              data: data.dataProgramado,
              lineTension: 0,
              fill: false,
              borderColor: 'blue'
              //backgroundColor: '#2f4b7c'
            },
          ]
        };
        this.loaded = true;
      })
      
    }
  }
}
</script>