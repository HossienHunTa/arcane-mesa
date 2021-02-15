<template>
    <Header/>
  <div id="app">
    <Main />
  </div>
    <Footer/>
</template>

<script>
import Main from './components/Main.vue'
import Header from './components/Hedear.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Main,
    Header,
    Footer,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>