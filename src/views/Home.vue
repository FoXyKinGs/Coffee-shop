<template>
  <div class="home">
    <Navbar title="Home" type="0" :data="dataCart"/>
    <Sidebar/>
    <Menu v-on:actionFromMenu="onClickMenu"/>
    <button class="res-cart" @click="$bvModal.show('respon-cart')"><b-icon icon="cart-3" font-scale="2" style="color: #fff;"></b-icon><span class="badge badge-pill text-white">{{dataCart.length}}</span></button>
    <div class="content-cart">
      <div class="orders">
        <div v-if="dataCart.length > 0">
          <div v-for="(items, index) in dataCart" :key="index">
            <div class="bg-light mb-3" style="width: 93%; background: #fff !important">
            <div class="row g-0">
              <div class="col-md-2">
                <img :src="`${setURL}/images/${items.image}`" class="m-4" style="width: 60px;">
              </div>
              <div class="col-md-10">
                <div class="card-body" style="margin-left: 20px;">
                  <h5 class="card-title">{{items.name}}<button class="delete" v-on:click="deleteCart(items.id)">x</button></h5>
                    <button class="auto-text" v-on:click="minQty(items.id)" style="background: #dffadb">-</button>
                    <div class="auto-text">{{items.qty}}</div>
                    <button class="auto-text" v-on:click="plusQty(items.id)" style="background: #dffadb">+</button>
                    <div class="price">{{parseToRupiah(items.price * items.qty)}}</div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div class="info">
            <div class="prices">
            <h4>Harga:</h4>
            <h3>{{parseToRupiah(total)}}</h3>
            </div>
            <div class="more-info">
              <h6>*Belum termasuk PPN</h6>
            </div>
          </div>
        <div class="buttons">
        <button type="button" class="btn btn-primary btn-lg btn-block" style="background-color:#57CAD5; border: none;" @click="checkOut();$bvModal.show('modal-2')">Check Out</button>
        <button type="button" class="btn btn-secondary btn-lg btn-block" @click="deleteOrders()" style="background-color: #F24F8A; border: none;">Cancel</button>
        </div>
        </div>
        <div v-else>
            <img class="image-cart" src="../assets/Icon/food-and-restaurant.png" alt="Empty">
            <h3 class="text-cart">Your Cart Is Empty</h3>
            <p v-test="{ color : '#8a8a8a' }" class="par-text-cart">please add some items from the menu</p>
        </div>
      </div>
    </div>
    <b-modal id="modal-2">
      <template #modal-header>
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-3"><h3>Checkout</h3></div>
          <div class="col-lg-8 col-md-8 col-sm-8 col-xs-9" style="position: absolute; right: 0;">Invoice #{{resultDataCart.invoice}}</div>
          <h6 class="col-lg-12">Cashier : {{cashier}}</h6>
        </div>
      </template>
      <form class="mt-2">
        <div class="row" v-for="(item, index) in dataCart" :key="index">
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">{{item.name}} x{{item.qty}}</div>
          <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-right">Rp. {{item.price * item.qty}}</div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">PPN 10%</div>
          <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-right">Rp. {{this.ppn = this.total * 0.1}}</div>
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><h4>Total :</h4></div>
          <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-right"><h4>Rp. {{this.total + this.ppn}}</h4></div>
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><h6>payment: cash</h6></div>
        </div>
      </form>
      <template #modal-footer>
        <div class="w-100">
        <b-button type="button" class="btn text-white border-0" style="background-color: #F24F8A;" block @click="$bvModal.hide('modal-2');deleteOrders()">Print</b-button>
        <b-button type="button" class="btn text-white border-0" style="background-color:#57CAD5;" block @click="$bvModal.hide('modal-2');deleteOrders()">Send Email</b-button>
        </div>
      </template>
    </b-modal>
    <b-modal id="respon-cart" title="Cart" hide-footer>
        <div v-if="dataCart.length > 0">
          <div v-for="(items, index) in dataCart" :key="index">
            <div class="bg-light mb-3" style="width: 93%; background: #fff !important">
            <div class="row g-0">
              <div class="col-md-2">
                <img :src="`${setURL}/images/${items.image}`" class="m-4" style="width: 60px;">
              </div>
              <div class="col-md-10">
                <div class="card-body" style="margin-left: 20px;">
                  <h5 class="card-title">{{items.name}}<button class="delete" v-on:click="deleteCart(items.id)">x</button></h5>
                    <button class="auto-text" v-on:click="minQty(items.id)" style="background: #dffadb">-</button>
                    <div class="auto-text">{{items.qty}}</div>
                    <button class="auto-text" v-on:click="plusQty(items.id)" style="background: #dffadb">+</button>
                    <div class="price">{{parseToRupiah(items.price * items.qty)}}</div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div class="info">
            <div class="prices">
            <h4>Harga:</h4>
            <h3>{{parseToRupiah(total)}}</h3>
            </div>
            <div class="more-info">
              <h6>*Belum termasuk PPN</h6>
            </div>
          </div>
        <div class="buttons">
        <button type="button" class="btn btn-primary btn-lg btn-block" style="background-color:#57CAD5; border: none;" @click="checkOut();$bvModal.show('modal-2');$bvModal.hide('respon-cart')">Check Out</button>
        <button type="button" class="btn btn-secondary btn-lg btn-block" @click="deleteOrders()" style="background-color: #F24F8A; border: none;">Cancel</button>
        </div>
        </div>
        <div v-else>
            <img src="../assets/Icon/food-and-restaurant.png" style="margin-left:25%;" alt="Empty">
            <h3 style="margin-left:25%;">Your Cart Is Empty</h3>
            <p style="margin-left:20%;">please add some items from the menu</p>
        </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Menu from '../components/Menu'
import dataMixins from '../helpers/mixins'

export default {
  name: 'Home',
  mixins: [dataMixins],
  data () {
    return {
      dataCart: [],
      total: 0,
      ppn: 0,
      resultDataCart: {
        invoice: Math.floor((Math.random() * 100000000) + 1),
        cashier: localStorage.getItem('name'),
        orders: '',
        amount: ''
      },
      cashier: localStorage.getItem('name'),
      setURL: process.env.VUE_APP_BACKEND
    }
  },
  components: {
    Navbar,
    Sidebar,
    Menu
  },
  directives: {
    test (el, binding) {
      el.style = ` color: ${binding.value.color}`
    }
  },
  methods: {
    ...mapActions({
      inputHistory: 'history/inputHistory',
      getProduct: 'product/getAllProductDB'
    }),
    onClickMenu (value) {
      const checkProduct = this.dataCart.filter((item) => {
        return item.id === value.id
      })
      if (checkProduct.length >= 1) {
        this.dataCart.forEach(element => {
          if (element.id === value.id) {
            element.qty += 1
          }
        })
      } else {
        const newData = {
          id: value.id,
          name: value.product_name,
          image: value.image,
          price: value.price,
          qty: 1
        }
        this.dataCart = [...this.dataCart, newData]
      }
      this.totalCart()
    },
    deleteCart (value) {
      const newestCart = this.dataCart.filter((item) => {
        return item.id !== value
      })
      this.dataCart = newestCart
      this.totalCart()
    },
    minQty (id) {
      this.dataCart.forEach(element => {
        if (id === element.id) {
          element.qty -= 1
          if (element.qty < 1) {
            element.qty = 1
          }
        }
        this.totalCart()
      })
    },
    plusQty (id) {
      this.dataCart.forEach(element => {
        if (id === element.id) {
          element.qty += 1
          if (element.qty > 99) {
            element.qty = 99
          }
        }
        this.totalCart()
      })
    },
    totalCart () {
      this.total = 0
      this.dataCart.forEach(element => {
        this.total += element.price * element.qty
      })
    },
    deleteOrders: function () {
      this.dataCart = []
      this.totalCart()
    },
    checkOut () {
      this.Final()
      this.inputHistory(this.resultDataCart)
      this.getProduct()
      this.dataCart = []
    },
    Final: function () {
      this.resultDataCart.orders = ''
      this.dataCart.forEach(element => {
        this.resultDataCart.orders += element.name + ' ' + element.qty + ','
        this.ppn = this.total * 0.1
        this.resultDataCart.amount = this.total + this.ppn
      })
    }
  }
}
</script>

<style scoped>
  .content-cart{
    top: 70px;
    right: 0;
    height: 100%;
    width: 30%;
    position: fixed;
    padding: 10px;
  }
  .content-cart .orders{
    position: relative;
    margin-left: 10px;
    height: calc(60% - 45px);
    overflow: auto;
  }
  .content-cart .buttons{
    position: fixed;
    bottom: 20px;
    width: 27%;
  }
  .content-cart .info{
    position: fixed;
    bottom: 120px;
  }
  .content-cart .info .prices{
    display: flex;
  }
  .content-cart .info .prices h3{
    position: fixed;
    right: 20px;
  }
  .auto-text{
    display: inline-block;
    width: 25px;
    height: 25px;
    border: 1px solid green;
    justify-content: center;
    text-align: center;
    color: #82DE3A;
  }
  .delete{
    background: #F24F8A;
    position: absolute;
    right: 25px;
    width: 30px;
    transform: translate(-30%, -70%);
    border-radius: 50%;
    border: none;
    color: #fff;
  }
  .price{
    display: inline-block;
    position: absolute;
    right: 10%;
  }
  .image-cart{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
  }
  .text-cart{
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -20%);
    width: 250px;
  }
  .par-text-cart{
    position: absolute;
    font-size: 15px;
    top: 70%;
    left: 15%;
  }
  .res-cart{
    display: none;
    position: absolute;
    z-index: 100;
    bottom: 5%;
    right: 5%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background-color: #57CAD5;
  }
  .badge{
    position: absolute;
    top: 0;
    right: -10px;
    background-color: #cf4040;
    border: 1px solid #000;
  }
  ::-webkit-scrollbar{
      width: 5px;
  }
  ::-webkit-scrollbar-track{
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb{
    background-color: #5e5e5e;
    border-radius: 20px;
  }
  @media (max-width: 1080px){
    .content-cart{
      display: none;
    }
    .res-cart{
      display: inline-block;
    }
  }
</style>
