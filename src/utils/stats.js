// function createStatsMap(result) {
//   return result.reduce((acc, curr) => {
//     let attempts = 1
//     let found = curr.found
//
//     if (acc.has(curr.name)) {
//       const currResult = acc.get(curr.name)
//       attempts = currResult.attempts + 1
//       found += currResult.found
//     }
//     const accuracy = found / attempts
//
//     acc.set(curr.name, {attempts, found, accuracy})
//
//     return acc
//   }, new Map())
// }
//
// function getSessionStats(result) {
//   const map = createStatsMap(result)
//   return Array.from(map.entries()).map(i => {
//     const [key, value] = i
//     return {key, value}
//   })
// }

function getIntervalStats(result) {
  let stats = []
  let name = ''
  let found = 0
  let attempts

  result.forEach(item => {
    if (item.name !== name) {
      attempts = 1
      name = item.name
      found = item.found

      stats.push({
        name,
        accuracy: found / attempts,
        attempts
      })
    } else {
      let currQuestion = stats.find(i => i.name === name)
      currQuestion.found = found + item.found
      currQuestion.attempts = attempts + 1
    }
  })

  return stats
}

function getLastSession(result) {
  let session = 0

  result.forEach(i => {
    if (i.session > session) {
      session = i.session
    }
  })

  return session
}


function getSortedSessionStats(result) {
  let stats = []
  let questions = []
  let session = 0
  let name = ''
  let found = 0
  let attempts
  
  result.forEach(item => {
    if (item.session !== session) {
      questions = []
      session = item.session
      attempts = 1
      
      if (item.name !== name) {
        name = item.name
        found = item.found

        questions.push({
          name,
          accuracy: found / attempts,
          attempts
        })
      } else {
        let currQuestion = questions.find(i => i.name === name)
        currQuestion.found = found + item.found
        currQuestion.attempts = attempts + 1
      }
      stats.push({session, questions})
    } else {
      let currSession = stats.find(i => i.session === session)
      attempts = 1

      if (item.name !== name) {
        attempts = 1
        name = item.name
        found = item.found

        currSession.questions.push({
          name,
          accuracy: found / attempts,
          attempts
        })
      } else {
        let currQuestion = currSession.questions.find(i => i.name === name)
        currQuestion.found = found + item.found
        currQuestion.attempts = attempts + 1
      }
    }
  })
  
  return stats
}


export {
  getIntervalStats,
  getSortedSessionStats,
  getLastSession
}