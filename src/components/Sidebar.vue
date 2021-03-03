<template>
    <div>
        <div class="sidebar">
            <ul>
            <li><router-link to="/"><img src="../assets/Icon/fork.png" alt=""></router-link></li>
            <li><router-link to="/history"><img src="../assets/Icon/clipboard.png" alt=""></router-link></li>
            <li><router-link to=""  v-b-modal.modal-product><img src="../assets/Icon/add.png" alt=""></router-link></li>
            </ul>
        </div>
            <button class="btn btn-danger" @click="onLogout()" style="position:fixed;left:2%;bottom:1%;z-index:1;"><b-icon icon="power"></b-icon></button>
        <!-- Insert Data Product -->
        <b-modal id="modal-product" title="Add Items">
          <form>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="addMenu.product_name">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label" >Image</label>
                <div class="col-sm-10">
                  <input class="form-control" type="file" @change="file($event)">
                </div>
              </div>
            </form>
           <form>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Price</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" v-model="addMenu.price">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputState" class="col-sm-2 col-form-label">Category</label>
              <div class="col-sm-4">
                <select id="inputState" class="form-control" v-model="addMenu.id_category">
                  <option v-for="(item, index) in getCategory" :key="index" :value="item.id">
                    {{item.category_name}}
                  </option>
                </select>
              </div>
            </div>
           </form>
      <template #modal-footer>
        <div class="w-100">
        <b-button type="button" class="btn text-white border-0" style="background-color: #F24F8A;" block @click="$bvModal.hide('modal-product')">Cancel</b-button>
        <b-button type="button" class="btn text-white border-0" style="background-color:#57CAD5;" block @click="sendToMenu()">Add</b-button>
        </div>
      </template>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      addMenu: {
        id_category: '',
        product_name: '',
        image: '',
        price: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      getCategory: 'category/getDataCategory'
    })
  },
  methods: {
    ...mapActions({
      actionLogout: 'auth/logout',
      getAllHistory: 'category/getAllCategory',
      sendProduct: 'product/insertProduct',
      setNewProduct: 'product/getAllProductDB'
    }),
    file (data) {
      this.addMenu.image = data.target.files[0]
    },
    sendToMenu () {
      const fd = new FormData()
      fd.append('id_category', this.addMenu.id_category)
      fd.append('product_name', this.addMenu.product_name)
      fd.append('image', this.addMenu.image)
      fd.append('price', this.addMenu.price)
      this.sendProduct(fd).then((response) => {
        alert('data added')
        this.setNewProduct()
        this.$bvModal.hide('modal-product')
      }).catch((err) => {
        alert(err)
      })
    },
    onLogout () {
      this.actionLogout().then((response) => {
        if (response) {
          this.$router.push('/login')
        } else {
          alert('error')
        }
      })
    }
  },
  mounted () {
    this.getAllHistory()
  }
}
</script>

<style scoped>
  .sidebar{
    position: fixed;
    top: 70px;
    left: 0;
    width: 80px;
    height: 100%;
  }
  .sidebar ul li img{
    padding: 10px 10px 10px 15px;
    justify-content: center;
    margin-top: 5px;
  }
.sidebar ul li:hover{
    background: #E5E5E5;
  }
</style>
