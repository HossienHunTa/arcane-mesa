<template>
  <div class="container backgroundpage">
    <b-form @submit="onSubmit" v-if="show" class="formup">
      <b-form-group class="text-right" id="gp_phoneNumber" label="شماره همراه" label-for="phoneNumber" description="شماره تلفن خود را به صورت 09123456789 وارد کنید.">
        <b-form-input id="phoneNumber" v-model="form.phoneNumber" type="tel" placeholder="09151234567" required> 	</b-form-input>
      </b-form-group>

      <b-form-group class="text-right" id="gp_password" label="رمز عبور" label-for="password">
        <b-form-input id="password" type="password" v-model="form.password" placeholder="123456789" required></b-form-input>
        </b-form-group>

      <b-form-group class="text-right" id="gp_password" label="تکرار رمز عبور" label-for="password">
        <b-form-input id="confpassword" type="password" v-model="form.confpassword" placeholder="123456789" required></b-form-input>
      </b-form-group>
      

      <b-button class="btn ml-2" type="submit" variant="primary">ثبت نام</b-button>
      <router-link to="/login"><b-button class="mr-2" variant="danger">قبلا ثبت نام کردم</b-button></router-link>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';

  export default {
    data() {
      return {
        form: {
          phoneNumber: null,
          password: '',
          confpassword: '',
        },
        show: true,
        url: 'https://arcane-mesa-44871.herokuapp.com/api/v1/'
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        axios.post(this.url + 'users/register/', { phoneNumber: this.form.phoneNumber, password: this.form.password, confirmPassword: this.form.confpassword }).then(res => {
          alert(res.data.message)
          this.$router.push({name: 'Login'})
        }).catch(err => { console.log(err) });
      },
    }
  };
</script>
<style>
.formup{
  width: 50%;
margin: 0 auto;
font-family: "Vazir" !important;
transform: translateY(35%);
background: #fff;
padding: 30px;
border-radius: 16px;
}
.backgroundpage{
  max-width:100% !important;
  background:url("../assets/img/baccoffi.jpg");
  background-size: cover;
  height: 43.8vw;

}
</style>