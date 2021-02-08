<template>
  <div class="about">
    <Navbar title="history" type="1"/>
    <Sidebar/>
    <div class="content">
      <div class="square">
        <div class="r1">
        <br>
        <p>Today's Income</p>
        <h3>Rp. 1.000.000</h3>
        <p>+2% Yesterday</p><br>
        </div>
        <div class="r2">
        <br><p>Orders</p>
        <h3>3.270</h3>
        <p>+5% Last Week</p><br>
        </div>
        <div class="r3">
        <br><p>This Year's Income</p>
        <h3>Rp. 100.000.000.000</h3>
        <p>+10% Last Year</p><br>
        </div>
      </div>
      <div class="chart-line">
              <h3 style="padding: 20px;">Revenue</h3>
            <Chart/>
      </div>
      <table class="table table-light mt-4">
              <thead>
                  <tr>
                      <th><h2>Recent Order</h2></th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>INVOICE</td>
                      <td>CASHIER</td>
                      <td>DATE</td>
                      <td>ORDERS</td>
                      <td>AMOUNT</td>
                  </tr>
                  <tr v-for="(item, index) in getResultHistory" :key="index">
                      <th>#{{item.invoice}}</th>
                      <th>{{item.cashier}}</th>
                      <th>{{item.date}}</th>
                      <th>{{item.orders}}</th>
                      <th>{{item.amount}}</th>
                  </tr>
              </tbody>
          </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Chart from '../components/Chart'

export default {
  components: {
    Navbar,
    Sidebar,
    Chart
  },
  computed: {
    ...mapGetters({
      getResultHistory: 'history/resultDataHistory'
    })
  },
  methods: {
    ...mapActions({
      getAllHistory: 'history/getHistory'
    })
  },
  mounted () {
    this.getAllHistory()
  }
}
</script>

<style scoped>
  .content{
      position: fixed;
      margin-top: 70px;
      height: calc(100% - 70px);
      width: calc(100% - 80px);
      margin-left: 80px;
      margin-right: 50px;
      padding: 30px;
      overflow: auto;
      background: #E5E5E5;
  }
  .chart-line{
    background: #fff;
    border-radius: 10px;
    box-shadow: 6px 6px 2px rgba(0,0,0,0.4);
  }
  table{
    overflow: auto;
    box-shadow: 6px 6px 2px rgba(0,0,0,0.4);
    border-radius: 10px;
  }
  .square{
    display: flex;
  }
  .square div{
    width: 30%;
    margin-right: 50px;
    margin-bottom: 20px;
    padding: 20px;
  }
  .r1{
    background-image: url('../assets/Rectangle1.png');
    background-repeat: no-repeat;
  }
  .r2{
    background-image: url('../assets/Rectangle3.png');
    background-repeat: no-repeat;
  }
  .r3{
    background-image: url('../assets/Rectangle2.png');
    background-repeat: no-repeat;
  }
  @media (max-width: 1080px){
    .square{
      display: inline-block;
    }
    .square div{
      width: 100%;
    }
  }
</style>
