import fortune from 'fortune'

const recordTypes = {
  session: {
    num: Number,
    questions: [ Array('question') ],
    author: [ 'user', 'posts' ]
  },
  question: {
    name: String,
    createdAt: Date,
    responses: [ Array('response'), 'author' ],
    parent: [ 'session'],
  },
  response: {
    name: String,
    parent: ['question', 'session']
  }
}

const store = fortune(recordTypes)