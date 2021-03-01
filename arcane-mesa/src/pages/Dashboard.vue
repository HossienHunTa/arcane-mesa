<template>
<div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav class="relativebox">
      <b-nav-item class="active"><b-link to="/dashboard" exact>داشبورد</b-link></b-nav-item>
      <b-nav-item><b-link to="/users" exact>کاربران</b-link></b-nav-item>
      <b-nav-item><b-link to="/products" exact>محصولات</b-link></b-nav-item>
      <b-nav-item><b-link to="/cats" exact>دسته بندی</b-link></b-nav-item>
  <b-nav-item id="logout"><b-button v-on:click="logout(self,url)"> خروج</b-button></b-nav-item>
    </b-navbar-nav>
  </b-navbar>
  <router-view> </router-view>
  <footer class="bg-dark share-network-list mt-3">
  <ShareNetwork v-for="network in networks" :network="network.network" :key="network.network" :style="{backgroundColor: network.color}">
        <i :class="network.icon"></i>
        <span>{{ network.name }}</span>
    </ShareNetwork><br>
    <p class="text-center memo">© 2021 Copyright: <a><b-link to="/" exact> Arcane Mesa </b-link></a></p>
  </footer>
</div>
</template>
<script>

import axios from 'axios';

export default {
  name: 'Dashboard',
  data() {
    return {
      networks: [
      { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
      { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' }
      ],
      show: true,
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
        if(res.data.rol == 'admin'){
          this.show = true
        }else{
          this.show = false
        }
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
  .share-network-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: auto;
    padding-top: 60px;
  }
  a[class^="share-network-"] {
    flex: none;
    color: #FFFFFF;
    background-color: #333;
    border-radius: 15px 5px 5px 15px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 10px 10px 0;
  }
  a[class^="share-network-"] .fah {
    background-color: rgba(0, 0, 0, .2);
    padding: 10px;
    flex: 0 1 auto;
  }
  a[class^="share-network-"] span {
    padding: 0 10px;
    flex: 1 1 0%;
    font-weight: 200;
  }
</style>