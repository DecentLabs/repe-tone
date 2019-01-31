import fortune from 'fortune'
import indexedDBAdapter from 'fortune-indexeddb'

const QUESTION = 'question'

const recordTypes = {
  [QUESTION]: {
    name: String,
    date: Date,
    found: Number,
    session: Number
  }
}

const store = fortune(recordTypes, {
  adapter: [ indexedDBAdapter, {
    name: 'intervals db'
  } ]
})

// all returns promises:

function createQuestion(name, session = 1) {
  const records = {
    name,
    session,
    found: 0,
    date: new Date()
  }
  return store.create(QUESTION, records)
}


function updateQuestion(id, found) {
  const updates = {
    id,
    replace: { found }
  }

  return store.update(QUESTION, updates)
}

function getQuestions() {
  const options = {
    sort: {
      name: true,
      date: false
    }
  }

  return store.find(QUESTION, undefined, options)
}

function getSessionQuestions() {
  const options = {
    sort: {
      session: true,
      name: true
    }
  }

  return store.find(QUESTION, undefined, options)
}

function getQuestionsBySession(session) {
  const options = {
    sort: {
      name: true
    },
    match: {
      session
    }
  }

  return store.find(QUESTION, undefined, options)
}

function deleteQuestion(id) {
  return store.delete(QUESTION, id)
}

export {
  createQuestion,
  updateQuestion,
  getQuestions,
  getSessionQuestions,
  getQuestionsBySession,
  deleteQuestion
}

