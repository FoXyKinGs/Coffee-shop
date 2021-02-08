<template>
    <div class="bg">
        <br>
        <div class="register-form">
            <form v-on:submit.prevent="onSubmit()">
                <h3>Register</h3>
                <hr>
                <div class="row mb-3">
                    <div class="col-lg-3">Name </div>
                    <div class="col-lg-9"><input type="text" v-model="dataRegister.name" class="form-control" placeholder="Name"></div>
                </div>
                <div class="row mb-3">
                    <div class="col-lg-3">Email </div>
                    <div class="col-lg-9"><input type="email" v-model="dataRegister.email" class="form-control" placeholder="Email"></div>
                </div>
                <div class="row mb-3">
                    <div class="col-lg-3">Password </div>
                    <div class="col-lg-9"><input type="password" v-model="dataRegister.password" class="form-control" placeholder="Password"></div>
                </div>
                <div class="row">
                    <div class="col-lg-3">Access </div>
                    <div class="col-lg-9">
                        <select class="form-control" v-model="dataRegister.access">
                            <option selected disabled>Select one</option>
                            <option value="0">Admin</option>
                            <option value="1">Cashier</option>
                        </select>
                    </div>
                </div>
                <br>
                <p>already have an account?<router-link to="/login">click here to login</router-link></p>
                <button class="btn btn-success" type="submit">Sign up</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      dataRegister: {
        name: '',
        email: '',
        password: '',
        access: ''
      }
    }
  },
  methods: {
    ...mapActions({
      setDataRegister: 'regis/addAccount'
    }),
    onSubmit () {
      if (!this.dataRegister.name || !this.dataRegister.email || !this.dataRegister.password || !this.dataRegister.access) {
        alert('all data must be filled')
      } else {
        this.setDataRegister(this.dataRegister).then((response) => {
          this.$router.push('/login')
          alert('Data has been register')
        }).catch((err) => {
          console.log(err)
          alert('Email registered')
        })
      }
    }
  }
}
</script>

<style scoped>
    .bg{
        background: url('../assets/wallpaper.jpg') no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        height: 100vh;
    }
    .register-form{
        position: absolute;
        top: 10%;
        right: 2.5%;
        background: white;
        width: 50%;
        padding: 20px;
        border-radius: 20px;
    }
</style>
