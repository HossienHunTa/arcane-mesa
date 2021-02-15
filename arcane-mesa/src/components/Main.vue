<template>
    <div>
        <h1>Main body</h1>
        <h1>{{ res }}</h1>
        <div>{{ List }}</div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Main',
    data () {
        return{
            res: '',
            List:{}
        }
    },
    mounted() {
        axios.post("https://arcane-mesa-44871.herokuapp.com/api/v1/users/register",{
            phoneNumber:'09152122110',
            password:'A021021021',
            confirmPassword:'A021021021'
        }).then(response => {
                this.res = response.status
                this.List = response.data
            }).catch(error => { console.log(error) })
    }
}
</script>