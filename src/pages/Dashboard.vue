<template>
<div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav class="relativebox">
      <b-nav-item :class="{DashbordShow: active}"><b-link to="/dashboard" exact>داشبورد</b-link></b-nav-item>
      <b-nav-item><b-link to="/users" exact>کاربران</b-link></b-nav-item>
      <b-nav-item><b-link to="/products" exact>محصولات</b-link></b-nav-item>
      <b-nav-item><b-link to="/" exact>دسته بندی</b-link></b-nav-item>
	<b-nav-item id="logout"><b-button v-on:click="logout(self,url)"> خروج</b-button></b-nav-item>
    </b-navbar-nav>
  </b-navbar>
  <router-view> </router-view>
</div>
</template>
<script>

import axios from 'axios';

export default {
	name: 'Dashboard',
	data() {
		return {
			show: false,
			url: 'https://arcane-mesa-44871.herokuapp.com/api/v1/',
			id: this.$cookies.get('id'),
			token: this.$cookies.get('token'),
			roll: this.$cookies.get('rol'),
			DashbordShow:true,
			self: this
		}
	},
	methods: {
        logout: (self, url) => {
      axios.post(url + 'users/logout').then(res => {
        if (res.status == 200) {
          self.$cookies.remove('id')
          self.$cookies.remove('token')
          self.$cookies.remove('rol')
          alert(res.data.message)
          self.$router.push({name: 'Login'})
        }
      })
    }
    },
	created() {
		if(this.id && this.token){
			let data = { 
				headers: {
					Authorization: this.token
				}
			}
			axios.get(this.url + 'users/' + this.id, data).then(res =>{
				this.$cookies.set('rol', res.data.rol)
			})
		}else{
			this.$router.push({name: 'Login'})
		}
	}
};
</script>
<style>
#logout{
	position:absolute;
	left:0;
	top:-7px;
}
.relativebox{
	width: 100%;
    position: relative;
}
.active a{
	background:red;
	color:#fff !important;
	text-decoration:none;
}
</style>