<template>
    <div>
        <div class="content">
            <form class="search-bar" action="" @submit.prevent="searchData()">
                <input type="text" class="form-control mr-2" v-model="form.searching" placeholder="Search">
                <button class="btn" type="submit"><b-icon icon="search" style="color: white;"></b-icon></button>
            </form>
          <div class="row mt-5">
            <div id="target" class="card col-lg-4 col-md-4 col-sm-6 col-xs-12" v-for="(element, index) in getResultProduct" :key="index">
              <img :src="`http://localhost:3000/images/${element.image}`" class="card-img-top" style="width: 100% !important; height: 200px;" v-on:click="addToCart(element)">
              <router-link :to="'/detail/' + element.id" class="btn btn-light border-0">Detail</router-link>
                <div class="card-body">
                  <h6 class="card-title">{{element.product_name}}</h6>
                  <h5>{{parseToRupiah(element.price)}}</h5>
                </div>
            </div>
          </div>
          <div class="pagination">
              <button class="mr-2" v-for="(item, index) in getPagination.totalPage" :key="index" @click="movePage(item)">
                  {{item}}
              </button>
          </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import dataMixins from '../helpers/mixins'
export default {
  mixins: [dataMixins],
  data () {
    return {
      form: {
        searching: '',
        page: 1
      },
      dataCart: []
    }
  },
  computed: {
    ...mapGetters({
      getResultProduct: 'product/resultDataProduct',
      getPagination: 'product/resultPagination'
    })
  },
  methods: {
    ...mapActions({
      getProduct: 'product/getAllProduct'
    }),
    searchData () {
      this.getProduct(this.form)
    },
    movePage (data) {
      this.form.page = data
      this.getProduct(this.form)
    },
    addToCart (element) {
      this.$emit('actionFromMenu', element)
    }
  },
  mounted () {
    this.getProduct(this.form)
  }
}
</script>

<style scoped>
    .content{
      position: fixed;
      margin-top: 70px;
      height: calc(100% - 70px);
      width: calc(100% - 30% - 80px);
      margin-left: 80px;
      margin-right: 50px;
      padding: 25px;
      overflow: auto;
      background: #E5E5E5;
    }
    .card{
    background-color: #e5e5e5 !important;
    border: none;
    }
    .pagination{
        display: flex;
        justify-content: center;
    }
    .pagination button{
        width: 25px;
    }
    .search-bar{
        position: absolute;
        display: flex;
        right: 25px;
    }
    .search-bar input{
        width: 150px;
    }
    .search-bar button{
      background: #57CAD5;
    }
    .search-bar button img{
      width: 25px;
      height: 25px;
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
    .pagination button{
      border-radius: 20px;
      border: none;
      background-color: #57CAD5;
      color: #fff;
    }
    .card-img-top:hover{
    opacity: 0.5;
    cursor: pointer;
  }
    @media (max-width: 1080px){
      .content{
        width: calc(100% - 80px);
      }
    }
</style>
