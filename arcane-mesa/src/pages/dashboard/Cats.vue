<template>
  <div class="container card mt-4">
    <div class="boxuser2">
      <b-button v-if="show" v-b-modal.modal-create id="btn" class="btn" variant="primary">ایجاد دسته بندی</b-button>
    </div>
    <b-modal id="modal-create" hide-footer>
      <template #modal-title>
        <h3 class="text-center">ایجاد دسته بندی </h3>
      </template>
      <b-form class="row text-center  creatcat" v-if="show">
        <b-form-group class="col-sm-7 mr43" id="gp_title" label="عنوان" label-for="title">
        <b-form-input id="title" v-model="form.title" type="text" placeholder="نوشیدنی خنک">  </b-form-input>
      </b-form-group>
      <b-button class="mt-3" block v-on:click="Submit(self)" variant="success">ایجاد دسته بندی</b-button>
      <b-button class="mt-3" block v-on:click="Close(self)">بستن</b-button>
      </b-form>
    </b-modal>
    <b-form class="row mt-4 text-center partuser partuser2" v-if="show">
    <b-form-group class="col-sm-4 mr-3" id="gp_id" label="ایدی دسته بندی" label-for="id">
        <b-form-input class="text-center" id="id" v-on:change="idHandler(self)" v-model="form.id" type="text" placeholder="s1f54242d3f45t67" required>  </b-form-input>
      </b-form-group>

      <b-form-group class="col-sm-4" id="gp_title" label="عنوان" label-for="title">
        <b-form-input id="title" v-model="form.title" type="text" placeholder="نوشیدنی خنک">  </b-form-input>
      </b-form-group>

        <b-button v-on:click="Update(self)" id="btn" class="btn" variant="warning">بروز رسانی دسته بندی</b-button>
        <b-button v-on:click="Delete(self)" id="btn" class="btn" variant="danger">حذف دسته بندی</b-button>
        <p v-if="error">{{ error }}</p>
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
           id:null,
           title:null,
        },
        fields: [
          { key:'_id', label:'ایدی دسته بندی' },
          { key:'title', label:'عنوان دسته بندی' },
          { key:'date', label:'تاریخ' }
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
        axios.post(self.url + 'cats/', {title: title}, self.data).then(res => alert(res.data.message))
      },
      Close: (self) => { self.$router.go(0) },
      Update: (self) => {
        let post_data = { title: self.form.title}
        axios.put(self.url + 'cats/' + self.form.id, post_data, self.data).then( () => { alert('بروزرسانی موفقیت آمیز بود');self.$router.go(0) }).catch(() => { alert('مشکل در بروزرسانی') });
      },
      Delete: (self) => {
        axios.delete(self.url + 'cats/' + self.form.id, self.data).catch( () => { alert('دسته بندی با موفقیت حذف شد');self.$router.go(0) })
      },
      idHandler: (self) => {
        if (self.form.id != null) {
        axios.get(self.url + 'cats/' + self.form.id, self.data).then(res => {
          self.form.title = res.data.title
        }).catch(err => {
          console.log(err)
          self.error = 'این ایدی وجود ندارد'
        })
      }
      }
    },
    created() {
      if (this.$cookies.get('rol') == 'admin'){
       axios.get(this.url + 'cats', this.data).then(res => { this.items = res.data })
      }else{
       axios.get(this.url + 'cats', this.data).then(res => { this.items = res.data })
        this.fields = [
          { key:'title', label:'عنوان دسته بندی' },
          { key:'date', label:'تاریخ' }
        ],
        this.show = false
      }
    }
  };
</script>
<style>
.row.mt-4.text-center.partuser.partuser2 {
    display: flex;
    align-items: center;
}
.boxuser2 button:nth-of-type(1){
  width:98%;
  margin-left:0 !important;
}
.boxuser2 {
    display: flex;
    align-items: center;
    margin-top: 2rem;
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
.partuser2 #btn {
    width: 15%;
    white-space: nowrap;
    font-size: 14px;
    margin: 0 !important;
    margin-right: 0.5% !important;
    transform: translateY(8px);

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
  .partuser2 #btn {
    width: 88%;
    margin: 1vw auto !important; 

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