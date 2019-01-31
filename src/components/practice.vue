<template>
  <div>
    <h1>RepeTone</h1>
    <h2>Hear the sound and tell the space</h2>
    <div class="playground">
      <button class="start" @click="startSession" v-if="!started">start session {{session}}</button>
      <div v-if="started" class="column">
        <button @click="play" class="play">play</button>
        <div class="row">
          <div class="input-group" v-for="interval in intervalAnswers">
            <input type="radio" name="answer" :id="interval.name + 'answer'" :value="interval.name" v-model="answer"
                   @change="setAnswer">
            <label :for="interval.name + 'answer'">{{interval.label}}</label>
          </div>
        </div>
        <button @click="getNext" class="next" :class="result && 'show'">next</button>
      </div>
      <button @click="toggleOverlay" class="stats">see stats</button>
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
          <div v-for="item in intervals" class="input-group">
            <input type="checkbox" :id="item.name+ 'int'" :value="item.name" :checked="intervalIsSelected(item.name)"
                   @change="selectIntervals">
            <label :for="item.name + 'int'" :class="getIntervalProgress(item.name)">{{item.label}}</label>
          </div>
        </div>
      </div>
    </div>
    <stats-overlay :stats="allStats" v-show="overlayVisible" @toggleOverlay="toggleOverlay"></stats-overlay>
  </div>
</template>

<script>
  import StatsOverlay from './stats.vue'
  import { samplesByInstrument } from '../utils/instruments'
  import { intervals, addInterval, getRandomNote } from '../utils/intervals'
  import { getIntervalStats, getSortedSessionStats, getLastSession } from '../utils/stats'
  import { createQuestion, getQuestions, getSessionQuestions, updateQuestion, getQuestionsBySession } from '../store'
  import { checkProgress } from '../utils/repeater'

  /* global Tone */
  /* eslint-disable no-console */

  export default {
    name: 'practice-scene',
    components: {StatsOverlay},
    data () {
      return {
        sampler: null,
        startNote: '',
        intervals,
        selectedIntervals: ['M3', 'P5'],
        directionOptions: [
          {id: 'asc', label: 'ascending'},
          {id: 'desc', label: 'descending'},
          {id: 'random', label: 'any direction'},
        ],
        direction: 'asc',
        answer: '',
        result: false,
        allStats: [],
        sessionStats: [],
        session: 1,
        sessionTotal: 3,
        attempted: false,
        counter: 0,
        started: false,
        questions: [],
        overlayVisible: false,
        progress: [],
      }
    },
    computed: {
      intervalAnswers () {
        return intervals.filter(item => this.selectedIntervals.indexOf(item.name) >= 0)
      },
      randomDirection () {
        const dirs = ['asc', 'desc']
        const i = Math.floor(Math.random() * dirs.length)
        return dirs[i]
      },
      selectedDirection () {
        return this.direction === 'random' ? this.randomDirection() : this.direction
      },
      intervalIsSelected () {
        return (val) => this.selectedIntervals.indexOf(val) >= 0
      },
      currentInterval () {
        return this.questions.length && this.questions[this.counter]
      },
    },
    methods: {
      startSession () {
        for (let i = 0; i < this.sessionTotal; i++) {
          createQuestion(this.getRandomInterval(), this.session).then(({payload}) => {
            this.questions.push(payload.records[0])

            if (i === this.sessionTotal - 1) {
              this.started = true
            }
          })
        }
      },
      endSession () {
        getQuestionsBySession(this.session).then(res => {
          this.sessionStats = getIntervalStats(res.payload.records)

          this.started = false
          this.session++
        })
        getQuestions().then(res => {
          this.allStats = getIntervalStats(res.payload.records)
          this.progress = checkProgress(this.allStats)
        })
      },
      play () {
        const noteB = addInterval(this.startNote, this.currentInterval.name, this.selectedDirection)

        this.sampler.triggerAttack(this.startNote, '+8n', 0.8)
        this.sampler.triggerAttack(noteB, '+2n', 0.8)
      },
      setAnswer () {
        this.result = this.answer === this.currentInterval.name
        const found = this.result ? 1 : 0

        if (!this.attempted) {
          updateQuestion(this.currentInterval.id, found).then(() => console.log('answer updated'))
          this.attempted = true
        }
      },
      getIntervalProgress (item) {
        const interval = this.progress.find(i => i.name == item)
        return interval && {good: interval.good, bad: interval.bad}
      },
      getRandomInterval () {
        const random = Math.floor(Math.random() * this.selectedIntervals.length)
        return this.selectedIntervals[random]
      },
      getNext () {
        this.counter++
        this.startNote = getRandomNote('piano')
        this.result = false
        this.answer = ''
        this.attempted = false
        if (this.counter % this.sessionTotal === 0) {
          this.endSession()
        }
      },
      selectIntervals (event) {
        const currentInterval = event.target.value

        if (this.selectedIntervals.indexOf(currentInterval) > 0) {
          this.selectedIntervals = this.selectedIntervals.filter(i => i !== currentInterval)
        } else {
          this.selectedIntervals.push(currentInterval)
          this.stats.push({
            name: currentInterval,
            total: 0,
            found: 0,
            accuracy: 0,
          })
        }
      },
      toggleOverlay() {
        this.overlayVisible = !this.overlayVisible
      }
    },
    mounted () {
      let piano = samplesByInstrument('piano')
      this.sampler = new Tone.Sampler(piano.notes, {baseUrl: piano.baseUrl, release: 1})

      Tone.Buffer.on('load', () => {
        this.sampler.toMaster()
      })

      this.startNote = getRandomNote('piano')

      getQuestions().then(res => {
        this.allStats = getIntervalStats(res.payload.records)
        this.progress = checkProgress(this.allStats)
      })
      getSessionQuestions().then(res => {
        this.session = res.payload.records.length && getLastSession(res.payload.records) + 1
      })
    },
  }
</script>

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
    margin: 15px 0;
  }

  .column {
    display: flex;
    width: 100%;
    height: 60%;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
  }

  .playground {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100px;
  }

  .settings {
    display: flex;
    width: 960px;
    height: 260px;
    margin: 0 auto;
    justify-content: center;
  }

  .settings-column:first-child {
    width: 20%;
  }

  .settings-column:last-child {
    width: 80%;
  }

  .settings-column h2 {
    text-align: left;
    padding-left: 30px;
  }

  button {
    display: block;
    width: 120px;
    padding: 7px 12px;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: #fff;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
  }

  .play {
    background: #39f9c6;
  }

  .next {
    opacity: 0;
    background: #a373f8;
  }

  .start {
    background: #4f34ad;
    width: 200px;
  }

  .stats {
    color: #23222a;
    border: 1px solid #23222a;
    margin: 10px 0;
  }

  .show {
    opacity: 1;
  }

  input {
    position: absolute;
    opacity: 0.01;
  }

  label {
    position: absolute;
    display: block;
    width: 100%;
    padding: 4px 6px;
    font-size: 16px;
    color: #4a4754;
    border-radius: 5px;
    border: 1px solid #4a4754;
    cursor: pointer;
    box-sizing: border-box;
  }

  label:hover {
    background: rgba(52, 235, 172, 0.1);
  }

  input:checked + label {
    color: #39f9c6;
    border: 2px solid #12f8be;
    font-weight: 700;
  }

  label.good::after,
  label.bad::after {
    content: '';
    position: absolute;
    top: calc(50% - 7px);
    right: -30px;
    width: 14px;
    height: 14px;
    border-radius: 100%;
  }

  label.good::after {
    background: #e1bef9;
  }

  label.bad::after {
    background: #b6bfce;
  }

  .input-group {
    position: relative;
    width: 120px;
    height: 36px;
    margin: 0 5px 5px;
  }
</style>
