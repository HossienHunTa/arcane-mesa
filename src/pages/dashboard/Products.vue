<template>
	<div class="container card mt-4">
    <div class="boxuser">
      <router-link to="/user"><b-button id="btn" class="btn" variant="primary">محصول</b-button></router-link>
      <router-link to="/users"><b-button id="btn" class="btn" variant="info">محصولات</b-button></router-link>
    </div>
    <b-form class="row mt-4 text-center partuser" v-if="show">
    <b-form-group class="col-sm-2 mr-3" id="gp_id" label="ایدی کاربر" label-for="id">
        <b-form-input class="text-center" id="id" v-model="form.id" type="text" placeholder="s1f54242d3f45t67" required> 	</b-form-input>
      </b-form-group>

      <b-form-group class="col-sm-3" id="gp_phoneNumber" label="شماره همراه" label-for="phoneNumber">
        <b-form-input id="phoneNumber" v-model="form.phoneNumber" type="text" placeholder="09151234567"> 	</b-form-input>
      </b-form-group>

      <b-form-group class="col-sm-4 text-center" id="gp_address" label="نشانی" label-for="address">
        <b-form-input id="address" type="text" v-model="form.address" placeholder="مشهد - بهارستان - بهارستان 2"></b-form-input>
        <br>
      </b-form-group>

      <b-button v-on:click="Submit(self)" id="btn" class="btn" variant="warning">بروزرسانی کاربر</b-button>
      <b-button v-on:click="Delete(self)" id="btn" class="btn" variant="danger">حذف کاربر</b-button>
    </b-form>
    <b-table responsive striped hover :items="items" :fields="fields"></b-table>
</div>

</template>

<script>
import axios from 'axios';

  export default {
    data() {
      return {
         data: { 
			headers: {
				Authorization: this.$cookies.get('token')
				}
		},
        form: {
           id:null,
           phoneNumber:null,
           address:null,
        },
        fields: [
          { key:'_id', label:'ایدی کاربر' },
          { key:'rol', label:'درجه' },
          { key:'phoneNumber', label:'شماره همراه' },
          { key:'address', label:'نشانی' },
          { key:'date', label:'تاریخ' }
        ],
        items: null,
        show: true,
        self: this,
        url: 'https://arcane-mesa-44871.herokuapp.com/api/v1/'
      }
    },
    methods: {
      Submit: (self) => {
        let post_data = {}
		if (self.form.phoneNumber != null || self.form.address != null){
			if (self.form.phoneNumber == null){
				post_data = { address: self.form.address }
			}else if (self.form.address == null) {
				post_data = { phoneNumber: self.form.phoneNumber}
			}else{
				post_data = { phoneNumber: self.form.phoneNumber, address: self.form.address }
			}
		}
        axios.put(self.url + 'users/' + self.form.id, post_data, self.data).then( () => { alert('بروزرسانی موفقیت آمیز بود');self.$router.go(0) }).catch(() => { alert('مشکل در بروزرسانی') });
      },
      Delete: (self) => {
        axios.delete(self.url + 'users/' + self.form.id, self.data).then( () => { alert('کاربر با موفقیت حذف شد');self.$router.go(0) })
      }
    },
    created() {
       axios.get(this.url + 'users', this.data).then(res => { this.items = res.data })
    }
  };
</script>
<style>
#btn{
	margin-top: 30px;
	height: 40px;
  margin-left: 15px;
}
.table thead th,.table td {
    text-align: center !important;
}
</style>