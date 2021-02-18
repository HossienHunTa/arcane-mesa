<template>
  	<form dir="rtl">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">عضویت</h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <md-input placeholder="نام" v-model="fristname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <md-input placeholder="نام خانوادگی" v-model="lastname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <md-input placeholder="شماره موبایل" v-model="phonenumber" type="text" maxlength="11" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :md-toggle-password="false">
              <md-input placeholder="رمز عبور" v-model="password" type="password" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :md-toggle-password="false">
              <md-input placeholder="تکرار رمز عبور" v-model="confpassword" type="password" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <router-link to="/login" custom><md-button class="md-raised md-success">ورود</md-button></router-link>
            <md-button v-on:click="register()" class="md-raised md-success">ثبت نام</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import axios from 'axios'

export default {
  name: "singup",
  data() {
    return {
      dataBackgroundColor:"green",
      error:null,
      res:null,
      List:null,
      phonenumber: null,
      password: null,
      confpassword: null,
      lastname: null,
      fristname: null,
      data_post: { phoneNumber: this.phonenumber, password: this.password, confirmPassword: this.confpassword },
    };
  },
  methods: {
    register : function(){
      if (this.fristname != '')
        { 
          this.data_post = {
            fullName: this.fristname + '' + this.lastname,
            address: 'Soon',
            phoneNumber: this.phonenumber,
            password: this.password,
            confirmPassword: this.confpassword
          }
        }
      axios.post('https://arcane-mesa-44871.herokuapp.com/api/v1/users/register', this.data_post).then(response => {
          if (response.status == 201){
            this.$cookies.set("id",response.data)
            this.$cookies.set("token",response.data.message)
            console.log(this.$cookies.get("id"))
            console.log(this.$cookies.get("token"))
            this.$router.push({name: 'Login'})
          }
      }).catch(err => {
        this.error = "Error To Connect Api :)"  
      })
    }
  }
};
</script>