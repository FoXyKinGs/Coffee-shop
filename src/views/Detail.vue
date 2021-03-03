<template>
    <div>
        <Navbar title="detailmenu" type="2"/>
        <div class="content">
            <div class="row">
                <div class="card mb-3" style="width: 100%;" v-for="(element, index) in getResultDetailProduct" :key="index">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img :src="`${setURL}/images/${element.image}`" alt="..." style="width: 100% !important; height: 100%; padding: 25px">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Id : </h5>
                            <p class="card-text">{{element.id}}</p>
                            <h5 class="card-title">Id category : </h5>
                            <p class="card-text">{{element.id_category}}</p>
                            <h5 class="card-title">Product Name : </h5>
                            <p class="card-text">{{element.product_name}}</p>
                            <h5 class="card-title">Image : </h5>
                            <p class="card-text">{{element.image}}</p>
                            <h5 class="card-title">Price : </h5>
                            <p class="card-text">{{parseToRupiah(element.price)}}</p>
                            <h5 class="card-title">Category : </h5>
                            <p class="card-text">{{element.category_name}}</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <form v-for="(element, index) in getResultDetailProduct" :key="' A ' + index">
                <div class="row">
                <h6 class="col-lg-3">ID :</h6><input class="form-control col-lg-9" type="text" :value="element.id" disabled>
                <h6 class="col-lg-3 mt-2">ID Category :</h6><select class="col-lg-8 mt-2" v-model="newData.id_category">
                    <option v-for="(item, index) in getCategory" :key="' B ' + index" :value="item.id">{{item.category_name}}</option>
                </select>
                <h6 class="col-lg-3 mt-2">Product Name :</h6><input class="form-control col-lg-9 mt-2" type="text" v-model="newData.product_name" :placeholder="element.product_name">
                <h6 class="col-lg-3 mt-2">Image :</h6><input class="form-control col-lg-9 mt-2" type="file" @change="file($event)">
                <h6 class="col-lg-3 mt-2">Price :</h6><input class="form-control col-lg-9 mt-2" type="text" v-model="newData.price" :placeholder="element.price">
                </div>
            </form>
            <div v-for="(element, index) in getResultDetailProduct" :key="' C ' + index">
            <button class="btn btn-primary" @click="updateP(element.id)">Update</button>
            <button class="btn btn-danger" @click="deleteP(element.id)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import { mapGetters, mapActions } from 'vuex'
import dataMixins from '../helpers/mixins'

export default {
  mixins: [dataMixins],
  data () {
    return {
      id: this.$route.params.id,
      newData: {
        id_category: '',
        product_name: '',
        image: '',
        price: ''
      },
      setURL: process.env.VUE_APP_BACKEND
    }
  },
  computed: {
    ...mapGetters({
      getResultDetailProduct: 'product/resultDetailProduct',
      getCategory: 'category/getDataCategory'
    })
  },
  methods: {
    ...mapActions({
      getDetail: 'product/getDetailProduct',
      getAllCategory: 'category/getAllCategory',
      deleteProduct: 'product/deleteProduct',
      updateProduct: 'product/updateProduct'
    }),
    updateP (e) {
      const fd = new FormData()
      fd.append('id_category', this.newData.id_category)
      fd.append('product_name', this.newData.product_name)
      fd.append('image', this.newData.image)
      fd.append('price', this.newData.price)
      this.updateProduct({
        id: this.$route.params.id,
        data: fd
      }).then((response) => {
        this.getDetail(this.$route.params.id)
      }).catch((err) => {
        alert(err)
      })
    },
    deleteP (value) {
      this.deleteProduct(value)
      alert('data deleted')
      this.$router.push('/')
    },
    file (data) {
      this.newData.image = data.target.files[0]
    }
  },
  components: {
    Navbar
  },
  mounted () {
    this.getDetail(this.id)
  }
}
</script>

<style scoped>
    .content{
      position: fixed;
      margin-top: 70px;
      height: calc(100% - 70px);
      width: 100%;
      padding: 20px 20px 0 20px;
      overflow: auto;
      background: #E5E5E5;
    }
</style>
