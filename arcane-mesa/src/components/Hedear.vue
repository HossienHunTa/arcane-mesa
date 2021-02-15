<template>
    <div>
        <h1>Hedear body</h1>
        <button v-on:click="logout('https://arcane-mesa-44871.herokuapp.com/api/v1/users/logout')">خروج</button>
        <h1>{{ res }}</h1>
        <div>{{ List }}</div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Hedear',
    data () {
        return{
            res: '',
            List:{}
        }
    },
    methods: {
        logout : function(event) {
        axios.post(event).then(response => {
                this.res = response.status
                this.List = response.data
            }).catch(error => { console.log(error) })
        }
    }
}
</script>