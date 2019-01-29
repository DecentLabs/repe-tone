import { samplesByInstrument } from '../utils/instruments'


const intervals = [
  {
    name: 'm2',
    label: 'minor 2nd'
  },
  {
    name: 'M2',
    label: 'major 2nd'
  },
  {
    name: 'm3',
    label: 'minor 3rd'
  },
  {
    name: 'M3',
    label: 'major 3rd'
  },
  {
    name: 'P4',
    label: 'perfect 4th'
  },
  {
    name: 'tri',
    label: 'tritone'
  },
  {
    name: 'P5',
    label: 'perfect 5th'
  },
  {
    name: 'm6',
    label: 'minor 6th'
  },
  {
    name: 'M6',
    label: 'major 6th'
  },
  {
    name: 'm7',
    label: 'minor 7th'
  },
  {
    name: 'M7',
    label: 'major 7th'
  },
  {
    name: 'P8',
    label: 'octave'
  }
]

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]

const getInterval = name => intervals.find(item => item.name === name)

function getRandomNote (instrument) {
  const sample = samplesByInstrument(instrument)
  const allregisters = (Object.keys(sample.notes).length / 12) - 1
  const register = Math.floor(Math.random() * allregisters)
  const note = notes[Math.floor(Math.random() * notes.length)]

  return `${note}${register}`
}

function addInterval(note, interval, dir) {
  let register = parseInt(note.slice(-1))
  const index = notes.indexOf(note.slice(0, -1))
  const intervalIndex = intervals.indexOf(getInterval(interval)) + 1
  let delta = 0

  if (dir === 'asc') {
    if (index + intervalIndex >= 12) {
      delta = index + intervalIndex - 12
      register++
    } else {
      delta = index + intervalIndex
    }
  } else {
    if (index - intervalIndex < 0) {
      delta = index - intervalIndex + 12
      register--
    } else {
      delta = index - intervalIndex
    }
  }

  return `${notes[delta]}${register}`
}


export {
  notes,
  intervals,
  getInterval,
  addInterval,
  getRandomNote
}