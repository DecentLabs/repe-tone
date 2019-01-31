<template>
  <div class="overlay" @click="close">
    <div class="overlay-inner">
      <div v-for="stat in stats">
        <div>{{stat.name}}</div>
        <div>{{stat.attempts}}</div>
        <div>{{stat.accuracy}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'stats-overlay',
    props: ['stats'],
    methods: {
      close() {
        this.$emit('toggleOverlay')
      }
    }
  }
</script>

<style>
  .overlay {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.16);
  }

  .overlay-inner {
    width: 80%;
    height: 70%;
    padding: 40px;
    background: #fff;
    box-sizing: border-box;
  }
</style>