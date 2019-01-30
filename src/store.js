import fortune from 'fortune'
import indexedDBAdapter from 'fortune-indexeddb'

const QUESTION = 'question'

const recordTypes = {
  [QUESTION]: {
    name: String,
    date: Date,
    found: Boolean,
    session: Number,
  }
}

const store = fortune(recordTypes, {
  adapter: [ indexedDBAdapter, {
    name: 'db'
  } ]
})

// all returns promises:
//
// function createSession(records) {
//   store.create(SESSION, records)
// }
//
// function getSession(id) {
//   store.find(SESSION, id)
// }


function createQuestion(name, session) {
  // records = random or generated intervals to ask
  const records = {
    name,
    session,
    found: false,
    date: new Date()
  }
  return store.create(QUESTION, records)
}

function getQuestion(id) {
  return store.find(QUESTION, id,)
}

function updateQuestion(id, found) {
  const updates = {
    id,
    replace: { found }
  }
  return store.update(QUESTION, updates)
}

export {
  // createSession,
  // getSession,
  createQuestion,
  getQuestion,
  updateQuestion
}

