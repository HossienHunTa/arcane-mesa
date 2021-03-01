<template>
  <div class="container card mt-4">
    <div class="boxuser mt-3">
      <b-button v-if="show" v-b-modal.modal-create class="btn ml-2 col-md-3" variant="primary">برسی سفارش</b-button>
      <b-button v-if="show" v-b-modal.modal-delete class="btn ml-2 mr-2 col-md-3" variant="danger">حذف سفارش</b-button>
      <router-link to="/orders"><b-button class="btn mr-2 ml-4 col-md-5" variant="info">ثبت سفارش جدید</b-button></router-link>
    </div>
    <div class="mt-3 mb-3 row mainbtn">
        <b-button class="col-sm-3 mr-4 ml-3" id="popover-products">نمایش تعداد محصولات</b-button>
        <b-popover target="popover-products" triggers="hover" placement="bottom">
          <b>{{ count.products }}</b>
        </b-popover>
        <b-button class="col-sm-2 mr-5 ml-2" id="popover-cats">دسته بندی ها</b-button>
        <b-popover target="popover-cats" triggers="hover" placement="bottom">
          <b>{{ count.cats }}</b>
        </b-popover>
        <b-button class="col-sm-2 ml-4 mr-2" id="popover-users">کاربران</b-button>
        <b-popover target="popover-users" triggers="hover" placement="bottom">
          <b>{{ count.users }}</b>
        </b-popover>
        <b-button class="col-sm-3 mr-5" id="popover-orders">نمایش تعداد سفارشات</b-button>
        <b-popover target="popover-orders" triggers="hover" placement="bottom">
          <b>{{ count.orders }}</b>
        </b-popover>
    </div>
    <b-modal id="modal-delete" hide-footer v-if="show">
        <template #modal-title>
          <h3 class="text-center">حذف سفارش</h3>
        </template>
        <b-form class="row mt-4 text-center partuser" v-if="show">
        <b-form-group class="col-sm-12" id="gp_id" label="ایدی سفارش" label-for="id">
        <b-form-input class="text-center" id="id" v-model="form.id" type="text" placeholder="s1f54242d3f45t67" required>  </b-form-input>
        </b-form-group>
        <b-button v-if="show" v-on:click="Delete(self)" class="btn" variant="danger">حذف سفارش</b-button>
      </b-form>
    </b-modal>
    <b-modal id="modal-create" hide-footer v-if="show">
      <template #modal-title>
        <h3 class="text-center">برسی سفارش</h3>
      </template>
      <b-form class="row mt-4 text-center partuser" v-if="show">
        <b-form-group class="col-sm-12" id="gp_id" label="ایدی سفارش" label-for="id">
        <b-form-input class="text-center" v-on:change="idHandler(self)" id="id" v-model="form.id" type="text" placeholder="s1f54242d3f45t67" required>  </b-form-input>
        </b-form-group>
      </b-form>
      <h1 class="text-center" v-if="modal_data != null">شرح سفارش </h1>
      <div class="mt-4" v-if="modal_data != null">
        <p class="text-right">شماره تلفن : {{ modal_data.phoneNumber }}</p>
        <p class="text-right" v-if="modal_data.fullName">نام : {{ modal_data.fullName }}</p>
        <p class="text-right" v-if="modal_data.address">آدرس : {{ modal_data.address }}</p>
      </div>
        <b-card-group deck v-if="modal_data != null">
          <b-card v-for="(item,index) in modal_data.orders" :key="index" header-tag="header" footer-tag="footer">
            <template #header>
              <h6 class="mb-0 text-center">{{ item.title }}</h6>
            </template>
            <template #main>
              {{ item.title }}
            </template>
            <b-card-text class="text-right">
             <p>قیمت : <span>{{ item.price }}</span></p><br>
             <p>تعداد : <span>{{ item.count }}</span></p>
            </b-card-text>
          </b-card>
        </b-card-group>
    </b-modal>
    <b-table v-if="show" class="mt-4" responsive striped hover :items="items" :fields="fields"></b-table>
</div>

</template>

<script>
import axios from 'axios';
//import FormData from 'form-data';

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
           title:null,
           price:null,
           cats:null,
           body:null,
           description:null
        },
        modal_data:null,
        cats: [],
        fields: [
          { key:'_id', label:'ایدی سفارش' },
          { key:'customer.phoneNumber', label:'شماره سفارش دهنده' },
          { key:'customer.fullName', label:'نام سفارش دهنده' },
          { key:'customer.address', label:'ادرس سفارش دهنده' },
          { key:'orders.length', label:'تعداد سفارشات' },
        ],
        count:{
          users:0,
          cats:0,
          orders:0,
          products:0
        },  
        items: null,
        show: true,
        self: this,
        error:null,
        url: 'https://arcane-mesa-44871.herokuapp.com/api/v1/'
      }
    },
    methods: {
      Delete: (self) => {
        axios.delete(self.url + 'orders/' + self.form.id, self.data).then( () => { alert('محصول با موفقیت پاک شد');self.$router.go(0) })
      },
      idHandler: (self) => {
        if (self.form.id != null) {
        axios.get(self.url + 'orders/' + self.form.id, self.data).then(res => {
          let modal_data = {
            fullName: res.data.customer.fullName,
            address: res.data.customer.address,
            phoneNumber: res.data.customer.phoneNumber,
            orders:[]
          }
          res.data.orders.forEach( function(element, index) {
            modal_data.orders.push({title: element.title, price: element.price, count: element.count})
            console.log(index)
          });
          self.modal_data = modal_data
        }).catch(err => {
          console.log(err)
          self.error = 'این ایدی وجود ندارد'
        })
      }
      }
    },
    created() {
      if (this.$cookies.get('rol') == 'admin'){
       axios.get(this.url + 'orders', this.data).then(res => {this.items = res.data;this.count.orders = res.data.length})
       axios.get(this.url + 'cats', this.data).then(res => {this.count.cats = res.data.length})
       axios.get(this.url + 'users', this.data).then(res => {this.count.users = res.data.length})
       axios.get(this.url + 'products', this.data).then(res => {this.count.products = res.data.length})
      }else{
       this.show = false;
       axios.get(this.url + 'orders', this.data).then(res => {this.count.orders = res.data.length})
       axios.get(this.url + 'cats', this.data).then(res => {this.count.cats = res.data.length})
       axios.get(this.url + 'users', this.data).then(res => {this.count.users = res.data.length})
       axios.get(this.url + 'products', this.data).then(res => {this.count.products = res.data.length})
      }
    }
  };
</script>
<style>
.mt-3.mb-3.row.mainbtn {
    margin-right: 14px;
    margin-left: 22px;
}
.table thead th,.table td {
    text-align: center !important;
}
.flexbox {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.flexbox button:nth-of-type(2) {
    margin-left: 29px !important;
}
@media(max-width:768px){
.mt-3.mb-3.row.mainbtn {
    margin-right: 0;
    margin-left: 0
  }
.boxuser.mt-3 button,.boxuser.mt-3 a {
    margin: 2vw auto !important;
    width: 98%;
}
.mt-3.mb-3.row.mainbtn button ,.mt-3.mb-3.row.mainbtn a{
    margin: 2vw auto !important;
    width: 98%;
}
}
</style>