<template>
	<div class="container card mt-4">
    <div class="boxuser">
      <router-link to="/cat"><b-button id="btn" class="btn" variant="primary">دسته</b-button></router-link>
      <router-link to="/cats"><b-button id="btn" class="btn" variant="info">دسته بندی ها</b-button></router-link>
    </div>
    <b-form class="row mt-4 text-center partuser">
    <b-form-group class="col-sm-4 mr-3" id="gp_id" label="ایدی کاربر" label-for="id">
        <b-form-input class="text-center" id="id" v-model="form.id" type="text" placeholder="s1f54242d3f45t67" required> 	</b-form-input>
      </b-form-group>

      <b-form-group class="col-sm-3 mr43" id="gp_phoneNumber" label="شماره همراه" label-for="phoneNumber">
        <b-form-input id="phoneNumber" v-model="form.phoneNumber" type="text" placeholder="09151234567"> 	</b-form-input>
      </b-form-group>

      <b-form-group class="col-sm-35  text-center" id="gp_address" label="نشانی" label-for="address">
        <b-form-input id="address" type="text" v-model="form.address" placeholder="مشهد - بهارستان - بهارستان 2"></b-form-input>
        <br>
      </b-form-group>
      <b-button v-if="show" v-on:click="Submit(self)" id="btn" class="btn mr-4" variant="success">پیدا کردن کاربر</b-button>
      <b-button v-on:click="Update(self)" id="btn" class="btn" variant="warning">بروزرسانی کاربر</b-button>
      <b-button v-if="show" v-on:click="Delete(self)" id="btn" class="btn" variant="danger">حذف کاربر</b-button>
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
        items: [],
        show: true,
        self: this,
        url: 'https://arcane-mesa-44871.herokuapp.com/api/v1/'
      }
    },
    methods: {
      Submit: (self) => {
               axios.get(self.url + 'users/' + self.form.id, self.data).then(res => { self.items.push(res.data) })
      },
      Update: (self) => {
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
        }
      },
      Delete: (self) => {
        axios.delete(self.url + 'users/' + self.form.id, self.data).then( () => { alert('کاربر با موفقیت حذف شد');self.$router.go(0) })
      },
    created() {
      if (this.$cookies.get('rol') == 'admin'){
       axios.get(this.url + 'users/' + this.$cookies.get('id'), this.data).then(res => { this.items.push(res.data) })
      }else{
        this.show = false;
        axios.get(this.url + 'users/' + this.$cookies.get('id'), this.data).then(res => { this.items.push(res.data) })
      }
    }
  };
</script>
<style>
#btn{
	margin-top: 30px;
	height: 40px;
  margin-left: 15px;
}
.boxuser a #btn {
    width: 48% !important;
}
.col-sm-35 {
    flex: 0 0 33.8%;
    max-width: 33.8%;
}
.partuser button:nth-of-type(1) {
    width: 30.7%;
    margin-bottom:2.2vw;
    margin-top:-1vw !important;
    margin-right:30px !important;
}
.partuser button:nth-of-type(2) {
    width: 28%;
    margin-bottom:1vw;
    margin-top:-1vw !important;
    margin-right:60px !important;
}
.partuser button:nth-of-type(3) {
    width: 28%;
    margin-bottom:1vw;
    margin-top:-1vw !important;
    margin-right:0px !important;
}
.mr43{
  margin-right: 43px;
}
@media (max-width:768px){
  .container{
    width:100% !important;
    max-width:100% !important;
  }
 .partuser button:nth-of-type(1) {
    width: 100%;
    margin-bottom:2.2vw;
    margin-top:-1vw !important;
    margin-right:10px !important;
}
.partuser button:nth-of-type(2) {
    width: 100%;
    margin-bottom:2.2vw;
    margin-top:-1vw !important;
    margin-right:10px !important;
}
.partuser button:nth-of-type(3) {
    width: 100%;
    margin-bottom:1vw;
    margin-top:-1vw !important;
    margin-right:10px !important;
}
#gp_id,#gp_phoneNumber,#gp_address,.col-sm-35{
  width:100% !important;
  max-width:100% !important;
  margin:2vw auto !important;
  padding:0 !important;
  flex: 0 0 70% !important;
  text-align:center !important;
}
#phoneNumber::placeholder,#address::placeholder{
text-align:center !important;
}
#phoneNumber,#address{
text-align:center !important;
}
.boxuser a #btn {
    width: 100% !important;
}
#__BVID__28{
  overflow: scroll !important;
  width:auto !important;
  
}
}
</style>