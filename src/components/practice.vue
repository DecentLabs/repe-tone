<template>
  <div>
    <button @click="play">play</button>
    <div class="input-group">
      <input type="radio" name="direction" id="asc" value="asc" v-model="direction">
      <label for="asc">ascending</label>
      <input type="radio" name="direction" id="desc" value="desc"  v-model="direction">
      <label for="desc">descending</label>
    </div>
    <div>intervals
      <div v-for="item in intervals" >
        <input type="checkbox" :id="item.name" :value="item.name" v-model="selectedIntervals">
        <label :for="item.name">{{item.label}}</label>
      </div>

        <span>Checked: {{ selectedIntervals }}</span>
    </div>

  </div>
</template>

<script>
import { samplesByInstrument } from '../utils/instruments'
import { intervals, addInterval, getRandomNote } from '../utils/intervals'

/* eslint-disable no-console */

export default {
  name: 'practice-scene',
  data () {
    return {
      sampler: null,
      intervals,
      selectedIntervals: [],
      direction: 'asc'
    }
  },
  computed: {
    startNote() {
      return getRandomNote('piano')
    }
  },
  methods: {
    play() {
      console.log(this.startNote)
      const noteB = addInterval(this.startNote, 'M3', this.direction)

      this.sampler.triggerAttackRelease(this.startNote, '4n', 0, 0.7)
      this.sampler.triggerAttackRelease(noteB, '4n', '4n', 0.7)
    }

  },
  mounted() {
    let piano = samplesByInstrument('piano')
    this.sampler = new Tone.Sampler(piano.notes, {baseUrl: piano.baseUrl, release: 1})

    Tone.Buffer.on('load', () => {
      this.sampler.toMaster()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
