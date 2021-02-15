<template>
  <h1 class="hunta">{{ msg }}</h1>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })
</script>

<style scoped>
@import 'https://fonts.googleapis.com/css?family=Permanent+Marker';
.hunta {
  font-family: Permanent Marker;
  color: snow;
  -webkit-animation: glow 2s ease-in-out both infinite;
          animation: glow 2s ease-in-out both infinite;
}
.hunta:nth-child(1) {
  -webkit-animation-delay: -0.2857142857s;
          animation-delay: -0.2857142857s;
}
.hunta:nth-child(2) {
  -webkit-animation-delay: -0.5714285714s;
          animation-delay: -0.5714285714s;
}
.hunta:nth-child(3) {
  -webkit-animation-delay: -0.8571428571s;
          animation-delay: -0.8571428571s;
}
.hunta:nth-child(4) {
  -webkit-animation-delay: -1.1428571429s;
          animation-delay: -1.1428571429s;
}
.hunta:nth-child(5) {
  -webkit-animation-delay: -1.4285714286s;
          animation-delay: -1.4285714286s;
}
.hunta:nth-child(6) {
  -webkit-animation-delay: -1.7142857143s;
          animation-delay: -1.7142857143s;
}
.hunta:nth-child(7) {
  -webkit-animation-delay: -2s;
          animation-delay: -2s;
}

@-webkit-keyframes glow {
  0%, 100% {
    text-shadow: 0 0 8.3333333333px snow, 0 -25px 50px tomato, -25px 25px 50px yellow, 25px 25px 50px tomato;
  }
  33% {
    text-shadow: 0 0 8.3333333333px snow, 0 -25px 50px cyan, -25px 25px 50px tomato, 25px 25px 50px cyan;
  }
  66% {
    text-shadow: 0 0 8.3333333333px snow, 0 -25px 50px yellow, -25px 25px 50px cyan, 25px 25px 50px yellow;
  }
}

@keyframes glow {
  0%, 100% {
    text-shadow: 0 0 8.3333333333px snow, 0 -25px 50px tomato, -25px 25px 50px yellow, 25px 25px 50px tomato;
  }
  33% {
    text-shadow: 0 0 8.3333333333px snow, 0 -25px 50px cyan, -25px 25px 50px tomato, 25px 25px 50px cyan;
  }
  66% {
    text-shadow: 0 0 8.3333333333px snow, 0 -25px 50px yellow, -25px 25px 50px cyan, 25px 25px 50px yellow;
  }
}
</style>