<template>
  <div class="container card mt-4">
    <div class="boxuser">
      <b-button v-if="show" v-b-modal.modal-create id="btn" class="btn col-sm-12" variant="primary">ایجاد دسته بندی</b-button>
    </div>
    <b-modal id="modal-create" hide-footer>
      <template #modal-title>
        <h3 class="text-center">ایجاد محصول</h3>
      </template>
      <b-form class="text-center" v-if="show">
        <b-form-group class="col-sm-7" id="gp_title" label="عنوان" label-for="title">
        <b-form-input id="title" v-model="form.title" type="text" placeholder="شکلات داغ  ">  </b-form-input>
      </b-form-group>
      <b-form-group class="col-sm-12 mt-2" id="gp_cats" label="دسته بندی" label-for="cats">
        <b-form-select id="cats" v-model="form.cats" :options="cats"></b-form-select>
      </b-form-group>
      <b-form-group class="col-sm-12" id="gp_price" label="قیمت" label-for="price">
        <b-form-input id="price" v-model="form.price" type="text" placeholder="15000">  </b-form-input>
      </b-form-group>
      <b-button class="btn mt-3" block v-on:click="Submit(self)" variant="success">ایجاد دسته بندی</b-button>
      <b-button class="btn mt-3" block v-on:click="Close(self)">بستن</b-button>
      </b-form>
    </b-modal>
    <b-form class="row mt-4 text-center partuser partuserproduct" v-if="show">
    <b-form-group class="col-sm-4 mr-3" id="gp_id" label="ایدی محصول" label-for="id">
        <b-form-input class="text-center" v-on:change="idHandler(self)" id="id" v-model="form.id" type="text" placeholder="s1f54242d3f45t67" required>  </b-form-input>
      </b-form-group>

      <b-form-group class="col-sm-3 mr43" id="gp_title" label="عنوان" label-for="title">
        <b-form-input id="title" v-model="form.title" type="text" placeholder="نوشیدنی خنک">  </b-form-input>
      </b-form-group>
      <b-form-group class="col-sm-4" id="gp_cats" label="دسته بندی" label-for="cats">
        <b-form-select id="cats" v-model="form.cats" :options="cats"></b-form-select>
      </b-form-group>
      <b-form-group class="col-sm-6" id="gp_body" label="بدنه" label-for="body">
        <b-form-input id="body" v-model="form.body" type="text" placeholder="">  </b-form-input>
      </b-form-group>
      <b-form-group class="col-sm-6" id="gp_price" label="قیمت" label-for="price">
        <b-form-input id="price" v-model="form.price" type="text" placeholder="15000">  </b-form-input>
      </b-form-group>
      <b-form-group class="col-sm-12" id="gp_description" label="توضیحات" label-for="description">
        <b-form-textarea class="rounded-lg " id="description" v-model="form.description" type="text" placeholder="یک نوشیدنی گرم با کمی قهوه و شکلات">  </b-form-textarea>
      </b-form-group>

      <div class="flexbox mt-4 flexboxproducts">
        <b-button v-on:click="Delete(self)" id="btn" class="btn" variant="danger">حذف دسته بندی</b-button>

        <b-button v-on:click="Update(self)" id="btn" class="btn" variant="warning">بروز رسانی دسته بندی</b-button>

        <p v-if="error">{{ error }}</p>
        </div>
    </b-form>
    <b-table class="mt-4" responsive striped hover :items="items" :fields="fields"></b-table>
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
        cats: [],
        fields: [
          { key:'_id', label:'ایدی محصول' },
          { key:'title', label:'عنوان' },
          { key:'category.title', label:'نوع دسته بندی' },
          { key:'price', label:'قیمت' },
          { key:'body', label:'بدنه' },
          { key:'description', label:'توضیحات' },
        ],
        items: null,
        show: true,
        self: this,
        error:null,
        url: 'https://arcane-mesa-44871.herokuapp.com/api/v1/'
      }
    },
    methods: {
      Submit: (self) => {
        let title = '' + self.form.title + '';
        axios.post(self.url + 'products/', {title: title, category: self.form.cats, price: self.form.price}, self.data).then(res => alert(res.data.message))
      },
      Close: (self) => { self.$router.go(0) },
      Update: (self) => {
        let post_data = {
          title :self.form.title,
          category: self.form.cats,
          price: self.form.price,
          body: self.form.body,
          description: self.form.description,
        }

        axios.put(self.url + 'products/' + self.form.id, post_data, self.data).then( () => { alert('بروزرسانی موفقیت آمیز بود');self.$router.go(0) }).catch(() => { alert('مشکل در بروزرسانی') });
      },
      Delete: (self) => {
        axios.delete(self.url + 'products/' + self.form.id, self.data).then( () => { alert('محصول با موفقیت پاک شد');self.$router.go(0) })
      },
      idHandler: (self) => {
        if (self.form.id != null) {
        axios.get(self.url + 'products/' + self.form.id, self.data).then(res => {
          self.form.title = res.data.title
          self.form.cats = res.data.category._id
          self.form.price = res.data.price
          self.form.body = res.data.body
          self.form.description = res.data.description
        }).catch(err => {
          console.log(err)
          self.error = 'این ایدی وجود ندارد'
        })
      }
      }
    },
    created() {
      if (this.$cookies.get('rol') == 'admin'){
       axios.get(this.url + 'cats', this.data).then(res => {
        res.data.forEach(element => this.cats.push({ value: element._id, text: element.title }))
       })
       axios.get(this.url + 'products', this.data).then(res => this.items = res.data)
      }else{
        axios.get(this.url + 'products', this.data).then(res => this.items = res.data)
        this.fields = [
          { key:'title', label:'عنوان' },
          { key:'category.title', label:'نوع دسته بندی' },
          { key:'price', label:'قیمت' },
          { key:'body', label:'بدنه' },
          { key:'description', label:'توضیحات' }
        ]
        this.show = false
      }
    }
  };
</script>
<style>
#description,#description:focus {
    width: 100%;
    border-radius: 0.75rem !important;
    border: 1px solid #ced4da;
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
.flexbox button:nth-of-type(2) {
    margin-left: 29px !important;
}
#gp_description__BV_label_ {
    font-weight: 900;
}
@media(max-width:768px){
.flexboxproducts {
    width: 92.5% !important;
    display: block !important;
    margin: 4vw auto !important;
    padding: 0 !important;
    display: flex;
    text-align: center;
    transform: translateX(2%);
}
.partuserproduct #gp_title,.partuserproduct #gp_id{
  padding: 0 !important;
  flex: 0 0 94% !important;
  margin: 0.7vw auto !important;
}
}

</style>