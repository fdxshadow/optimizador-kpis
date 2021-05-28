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
      semanaSeleccionada:this.$store.state.semanaActual,
      obraSeleccionada:this.$auth.user.obra.id,
      semanas:Array.from({length: 60}, (_, i) => i + 1),
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
   watch:{
        semanaSeleccionada: function(semana){
            console.log(semana);
            this.getDataCurvaS();
        }
    },
  created(){
    this.getDataCurvaS();
  },
  methods:{
    getDataCurvaS(){
      console.log("se ejecuta");
      this.$axios.get(`/planificacion/curva_s/${this.obraSeleccionada}`).then(resp=>{
        let data = resp.data;
        this.barChartData = {
          labels: data.labels.map(sem=> new Date(sem).toLocaleDateString()),
          datasets: [
            {
              label: 'Avance Real',
              data: data.dataReal.slice(0,this.semanaSeleccionada),
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