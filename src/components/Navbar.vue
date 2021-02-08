<template>
    <div>
        <div v-if="type==0" class="top-navbar">
            <div class="menu">
            <img src="../assets/Icon/menu (1).png" alt="">
          </div>
          <div class="nav-text">
            <h3>Food Items</h3>
          </div>
          <div class="cart">
            <div class="text-cart">
              <h3 class="pt-3">Cart<span class="badge badge-pill text-white" style="font-size:10px; vertical-align: text-top; background: #57CAD5;">{{data.length}}</span></h3>
            </div>
          </div>
        </div>
        <div v-else-if="type==1" class="top-navbar-history">
            <div class="menu">
            <img src="../assets/Icon/menu (1).png" alt="">
          </div>
          <div class="nav-text">
            <h3>History</h3>
          </div>
        </div>
        <div v-else class="top-navbar-history">
          <div class="nav-text">
            <h3>Detail Items</h3>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['title', 'type', 'data']
}
</script>

<style scoped>
.top-navbar{
    background: #fff;
    height: 70px;
    width: 70%;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 0 6px rgba(0,0,0,0.6)
  }
  .top-navbar .menu{
    width: 85px;
    position: relative;
  }
  .top-navbar .menu img{
    position: relative;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
  .nav-text{
    width: calc(100% - 90px);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
  }
  .cart .text-cart{
    position: fixed;
    top: 0;
    right: 0;
    width: 30%;
    height: 70px;
  }
  .cart h3{
    text-align: center;
  }
  .top-navbar-history{
    background: #fff;
    height: 70px;
    width: 100%;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 0 6px rgba(0,0,0,0.6)
  }
  .top-navbar-history .menu{
    width: 85px;
    position: relative;
  }
  .top-navbar-history .menu img{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
  .search input{
    position: absolute;
    left: 70%;
    top: 20px;
  }
  @media (max-width: 1080px){
      .top-navbar{
          width: 100%;
      }
      .cart{
          display: none;
      }
  }
</style>
