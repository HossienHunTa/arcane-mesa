<template>
  <div class="container card mt-4">
    <b-form class="row mt-4 text-center partuser partuser2" v-if="show">
    <b-form-group class="col-sm-4 mr-3" id="gp_id" label="ایدی کاربر" label-for="id">
        <b-form-input class="text-center" disabled="true" id="id" v-model="form.id" type="text" placeholder="s1f54242d3f45t67" required disbale>  </b-form-input>
      </b-form-group>

      <b-form-group class="col-sm-5" id="gp_order" label="محصولات" label-for="order">
        <b-form-select required id="order" v-model="form.order" :options="products" type="text" placeholder="نوشیدنی خنک">  </b-form-select>
      </b-form-group>
      <b-form-group class="col-sm-2" id="gp_count" label="تعداد" label-for="count">
        <b-form-input id="count" v-model="form.count" type="number" placeholder="12">  </b-form-input>
      </b-form-group>

      <div class="flexboxorders">
        <b-button v-on:click="Submit(self)" id="btn" class="btn" variant="success">ثبت سفارش</b-button>
        <b-button v-on:click="Add(self)" id="btn" class="btn" variant="warning">اضافه کردن محصول به لیست</b-button>
        <p v-if="error">{{ error }}</p>
        </div>
    </b-form>

    <b-table class="mt-4" responsive striped hover :items="items" :fields="fields"></b-table>
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
           id: this.$cookies.get('id'),
           order:null,
           count:1,

        },
        fields: [
          { key:'title', label:'نام محصول' },
          { key:'price', label:'قیمت محصول' },
          { key:'count', label:'تعداد' }
        ],
        items: [],
        products:[],
        show: true,
        self: this,
        error:null,
        url: 'https://arcane-mesa-44871.herokuapp.com/api/v1/'
      }
    },
    methods: {
      Submit: (self) => {
        axios.post(self.url + 'orders/', {customer:self.form.id, items: self.items}, self.data).then(res => { alert(res.data.message); self.$router.push({name: 'Dashboard'}) })
      },
      Add: (self) => {
        let count = 0
        if (self.form.count > 1){
          count = self.form.count
        }else{
          count = 1
        }
        axios.get(self.url + 'products/' + self.form.order, self.data).then(res => {
          self.items.push({title: res.data.title, price: res.data.price, count: count})
        }).catch(err => { alert('فیلد ها را پر کنید'); console.log(err) })
      }
    },
    created() {
       axios.get(this.url + 'products', this.data).then(res => {
      res.data.forEach(element => this.products.push({value: element._id, text: element.title}))
       })
    }
  };
</script>
<style>
.boxuser2 button:nth-of-type(1){
  position: absolute;
  left: 10px;
  margin: 0 !important;
}
.boxuser2 {
    display: flex;
    align-items: center;
}
#btn{
  margin-top: 30px;
  height: 40px;
  margin-left: 15px;
}
.table thead th,.table td {
    text-align: center !important;
}
.flexbox {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.flexboxorders{
    width: 100%;
    display: flex;
   justify-content: center !important;
}
.flexboxorders #btn{
  margin-left: 30px !important;
  margin-right: 30px !important;
  width: 20%;
}
.flexbox button:nth-of-type(2) {
    margin-left: 29px !important;
}
.close {
    float: left !important;
    width: 5%;
    padding: 0 !important;
    margin: 0 !important;
    text-align: left;
}
#modal-create___BV_modal_title_ {
    width: 100%;
    text-align: right !important;
}
.creatcat {
    display: flex;
    justify-content: center;
    padding-right: 0 !important;
    padding-left: 0 !important;
    margin-right: 0 !important;
    margin-left: 0 !important;
}
div#modal-create___BV_modal_content_ #gp_title {
    width: 100% !important;
    max-width: 100% !important;
    flex: 0 0 100% !important;
    margin: 0 auto;
    padding: 0;
}
.partuser2 #gp_title > div{
  width:100% !important;
}
.partuser2 #gp_title__BV_label_ {
    width: 100%;
}
.flexbox.flexboxcats #btn {
    position: static !important;
    margin: 0 !important;
}
.flexboxcats{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-left: 30px !important;
    margin-right: 30px !important;
}
/*.partuser #gp_title {
    flex: 0 0 30.333333%;
    max-width: 30.333333%;
}*/
@media(max-width:768px){
  .flexboxorders{
  width: 100%;
  display:block;
}
  .flexboxorders #btn{
  width: 91%;
  display: block;
  margin: 3vw auto !important;
}
  .row.mt-4.text-center.partuser.partuser2 {
    width: 100%;
    margin: 0 auto;
}
.partuser2 #gp_title {
    margin-right: 30px;
    margin-left: 30px;
    padding: 0 !important;
}
.boxuser2 button:nth-of-type(1) {
    position: absolute;
    left: 33px !important;
    margin: 0 !important;
    top: 10px;
    width: 82.5%;
    right: 39px;
}
.partuser2 #gp_id {
    padding: 0 !important;
    margin-top: 10vw !important;
    width: 100% !important;
    flex: 0 0 94% !important;
    margin-right: 29px !important;
    padding-left: 30px !important;
    max-width: 100% !important;
}
.flexboxcats {
    width: 100%;
    display: block;
    justify-content: space-between;
    margin-left: 30px !important;
    margin-right: 30px !important;
}
.flexbox.flexboxcats #btn {
    position: static !important;
    margin: 0 !important;
        margin-bottom: 0px;
    margin-bottom: 4vw !important;
    width: 100%;
}
}
</style>