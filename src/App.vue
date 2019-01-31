<template>
  <div id="app">
    <practice-scene />
  </div>
</template>

<script>
import PracticeScene from './components/practice.vue'

export default {
  name: 'app',
  components: {
    PracticeScene
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
body {
  position: relative;
}
</style>
