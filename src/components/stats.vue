<template>
  <div class="overlay" @click="close">
    <div class="overlay-inner">
      <h2>Your statistics</h2>
      <div class="stats">
        <div class="stat-col">
          <div>Interval</div>
          <div>Attempts</div>
          <div>Accuracy</div>
        </div>
        <div v-for="stat in stats" class="stat-col">
          <div>{{stat.name}}</div>
          <div>{{stat.attempts}}</div>
          <div>{{stat.accuracy}}</div>
        </div>
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stats {
    display: flex;
  }

  .stat-col div {
    min-width: 50px;
    margin-right: 20px;
    margin-bottom: 10px;
  }

  .stat-col:first-of-type div {
    text-align: left;
  }
</style>