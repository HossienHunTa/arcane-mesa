<template>
  <div class="container backgroundpage">
    <b-form @submit="onSubmit" v-if="show" class="formin">
      <b-form-group class="text-right" id="gp_phoneNumber" label="شماره همراه" label-for="phoneNumber" description="شماره تلفن خود را به صورت 09123456789 وارد کنید.">
        <b-form-input id="phoneNumber" v-model="form.phoneNumber" type="text" placeholder="09151234567" required> 	</b-form-input>
      </b-form-group>

      <b-form-group class="text-right" id="gp_password" label="رمز عبور" label-for="password">
        <b-form-input id="password" type="password" v-model="form.password" placeholder="123456789" required></b-form-input>
        <br>
      </b-form-group>

      <b-button class="ml-2" type="submit" variant="primary">ورود</b-button>
      <router-link to="/register"><b-button class="mr-2" variant="danger">میخوام ثبت نام کنم</b-button></router-link>
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
          password: null,
        },
        show: true,
        url: 'https://arcane-mesa-44871.herokuapp.com/api/v1/'
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        axios.post(this.url + 'users/login/', { phoneNumber: this.form.phoneNumber, password: this.form.password}).then(res => {
            this.$cookies.set("id",res.data.id,'6h')
            this.$cookies.set("token",res.data.token,'6h')
            this.$router.push({name: 'Dashboard'})
        }).catch(() => { alert('مشکل در ورود') });
      },
    },
    created() {
      if(this.$cookies.get('id') && this.$cookies.get('token')){
        this.$router.push({name: 'Dashboard'})
      }
  }
  };
</script>
<style>
.formin{
  width: 50%;
margin: 0 auto;
font-family: "Vazir" !important;
transform: translateY(50%);
background: #fff;
padding: 30px;
border-radius: 16px;
}

.backgroundpage{
  max-width:100% !important;
  background:url("../assets/img/baccoffi.jpg");
  background-size: cover;
  height: auto;
}
</style>