<template>
  	<form dir="rtl">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">ورود</h4>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <md-input placeholder="شماره موبایل" v-model="phonenumber" type="text" maxlength="11" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :md-toggle-password="false">
              <md-input placeholder="رمز عبور" v-model="password" type="password" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <router-link to="/register" custom><md-button class="md-raised md-success">عضویت</md-button></router-link>
            <md-button v-on:click="login()" class="md-raised md-success">ورود</md-button>
          </div><br><br>
            <h4 class="md-layout-item md-size-100 text-center">{{ error }}</h4>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import axios from 'axios'

export default {
  name: "sigin",
  data() {
    return {
      dataBackgroundColor: "green",
      error:null,
      res:null,
      List:null,
      phonenumber: null,
      password: null,
      confpassword: null,
      id: this.$cookies.get('id'),
    };
  },
  methods: {
    login : function(){
      axios.post('https://arcane-mesa-44871.herokuapp.com/api/v1/users/login',{
            phoneNumber: this.phonenumber,
            password: this.password,
        }).then(response => {
          if (response.status == 201){
            this.$cookies.set("id",response.data.id,'6h')
            this.$cookies.set("token",response.data.token,'6h')
            this.$router.push({name: 'MainPage'})
          }
      }).catch(err => {
        this.error = "Phone Number Or Password is not Work !!"  
      })
    }
  },
  created() {
      if(this.id){
        this.$router.push({name: 'MainPage'})
      }
  }
};
</script>
