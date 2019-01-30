import fortune from 'fortune'
import indexedDBAdapter from 'fortune-indexeddb'

const QUESTION = 'question'

const recordTypes = {
  [QUESTION]: {
    name: String,
    date: Date,
    found: Boolean,
    session: Number
  }
}

const store = fortune(recordTypes, {
  adapter: [ indexedDBAdapter, {
    name: 'intervals db'
  } ]
})

// all returns promises:

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
  return store.find(QUESTION, id)
}

function updateQuestion(id, found) {
  const updates = {
    id,
    replace: { found }
  }

  return store.update(QUESTION, updates)
}

function getQuestionsBySession(session) {
  const options = {
    match: {
      session
    }
  }

  return store.find(QUESTION, undefined, {options})
}

export {
  // createSession,
  // getSession,
  createQuestion,
  getQuestion,
  updateQuestion,
  getQuestionsBySession
}

