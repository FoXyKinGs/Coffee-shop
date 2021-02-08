<template>
    <div class="bg">
        <div class="register-form">
            <form action="" v-on:submit.prevent="onSubmitLogin()">
                <h3>Login</h3>
                <hr>
                <div class="row mb-3">
                    <div class="col-lg-3">Email </div>
                    <div class="col-lg-9"><input v-model="email" type="email" class="form-control" placeholder="Email"></div>
                </div>
                <div class="row mb-3">
                    <div class="col-lg-3">Password </div>
                    <div class="col-lg-9"><input v-model="password" type="password" class="form-control" placeholder="Password"></div>
                </div>
                <p>did'nt have an acount?<router-link to="/register">click here to register</router-link></p>
                <button class="btn btn-success" type="submit">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: '',
      token: localStorage.getItem('token')
    }
  },
  methods: {
    ...mapActions({
      actionLogin: 'auth/login'
    }),
    onSubmitLogin () {
      const data = {
        email: this.email,
        password: this.password
      }
      if (!data.email || !data.password) {
        alert('all data must be filled')
      } else {
        this.actionLogin(data).then((response) => {
          this.$router.push('/')
          alert(response)
        }).catch((err) => {
          console.log(err)
          alert('Email atau Password salah!')
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
        top: 25%;
        right: 2.5%;
        background: white;
        width: 45%;
        padding: 20px;
        border-radius: 20px;
    }
</style>
