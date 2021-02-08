<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted () {
    this.renderChart(
      {
        labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        datasets: [
          {
            label: 'This Month',
            data: [0, 20000, 10000, 28000, 21000, 39800, 12000, 47000, 40000, 32000, 36000, 24000, 46000, 35000, 39000, 30000, 23000, 39000, 30000],
            borderColor: ['#57CAD5'],
            backgroundColor: ['rgba(255, 255, 255, 0)']
          },
          {
            label: 'This Month',
            data: [10000, 30000, 1000, 38000, 21000, 39000, 12000, 28000, 21000, 48000, 12000, 28000, 12000, 40000, 28000, 40000, 12000, 28000, 40000],
            borderColor: ['#F24F8A'],
            backgroundColor: ['rgba(255, 255, 255, 0)']
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'My Data'
        }
      }
    )
  }
}
</script>
