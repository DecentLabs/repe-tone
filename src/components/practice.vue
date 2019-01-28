<template>
  <div>
    <h1>Repe-tone</h1>
    <h2>Hear the sound and tell the the space</h2>
    <div class="playground">
      <button @click="play" class="play">play</button>
      <div class="row">
        <div class="input-group" v-for="interval in intervalAnswers">
          <input type="radio" name="answer" :id="interval.name" :value="interval.name" v-model="answer" @change="checkInterval">
          <label :for="interval.name">{{interval.label}}</label>
        </div>
      </div>
      <button @click="getNext" v-if="result" class="next">play next</button>
    </div>
    <div class="settings">
          <div class="settings-column">
            <h2>direction</h2>
            <div class="column">
              <div class="input-group" v-for="dir in directionOptions">
                <input type="radio" name="direction" :id="dir.id" :value="dir.id" v-model="direction">
                <label :for="dir.id">{{dir.label}}</label>
              </div>
            </div>
          </div>
          <div class="settings-column">
            <h2>select intervals</h2>
            <div class="column">
              <div v-for="item in intervals" >
                <input type="checkbox" :id="item.name" :value="item.name" v-model="selectedIntervals">
                <label :for="item.name">{{item.label}}</label>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import { samplesByInstrument } from '../utils/instruments'
import { intervals, addInterval, getRandomNote } from '../utils/intervals'

/* global Tone */
/* eslint-disable no-console */

export default {
  name: 'practice-scene',
  data () {
    return {
      sampler: null,
      startNote: '',
      intervals,
      selectedIntervals: ['M3', 'P5'],
      directionOptions: [
        {id: 'asc', label: 'ascending'},
        {id: 'desc', label: 'descending'},
        {id: 'random', label: 'any direction'}
      ],
      direction: 'asc',
      answer: '',
      result: false,
      interval: ''
    }
  },
  computed: {
    intervalAnswers() {
      return intervals.filter(item => this.selectedIntervals.indexOf(item.name) >= 0)
    },
    randomDirection() {
      const dirs = ['asc', 'desc']
      const i = Math.floor(Math.random() * dirs.length)
      return dirs[i]
    },
    selectedDirection() {
      return this.direction === 'random' ? this.randomDirection() : this.direction
    }
  },
  methods: {
    play() {
      const noteB = addInterval(this.startNote, this.interval, this.selectedDirection)

      this.sampler.triggerAttackRelease(this.startNote, '4n', 0, 0.7)
      this.sampler.triggerAttackRelease(noteB, '4n', '4n', 0.7)
    },
    checkInterval() {
      this.result = this.answer === this.interval
    },
    getRandomInterval() {
      const random = Math.floor(Math.random() * this.selectedIntervals.length)
      return this.selectedIntervals[random]
    },
    getNext() {
      this.startNote = getRandomNote('piano')
      this.interval = this.getRandomInterval()
      this.result = false
      this.answer = ''
    }
  },
  mounted() {
    let piano = samplesByInstrument('piano')
    this.sampler = new Tone.Sampler(piano.notes, {baseUrl: piano.baseUrl, release: 1})

    Tone.Buffer.on('load', () => {
      this.sampler.toMaster()
    })

    this.startNote = getRandomNote('piano')
    this.interval = this.getRandomInterval()
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

.row {
  display: flex;
  justify-content: center;
}

.column {
  display: flex;
  width: 100%;
  height: 80%;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
}

.playground {
  margin-bottom: 100px;
}

.settings {
  display: flex;
  width: 960px;
  height: 260px;
  margin: 0 auto;
  justify-content: center;
}

.settings-column:first-child  {
  width: 20%;
}

.settings-column:last-child  {
  width: 80%;
}

button {
  width: 120px;
  padding: 7px 12px;
  margin: 0 5px;
  font-size: 18px;
  color: #fff;
  border-radius: 5px;
  border: 0;
}

.play {
  background: #2ec4a7;
}

.next {
  background: #f7de30;
}

input {
  visibility: hidden
}

label {
  display: block;
  width: 120px;
  padding: 4px 6px;
  margin: 0 5px;
  font-size: 16px;
  color: #4a4754;
  border-radius: 5px;
  border: 1px solid #4a4754;
  margin-right: 10px;
  margin-bottom: 5px;
}

input:checked + label {
  color: #26a28a;
  border: 2px solid #26a28a;
  font-weight: 700;
}
</style>
