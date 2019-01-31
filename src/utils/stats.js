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
        accuracy: 0,
        attempts
      })
    } else {
      let currQuestion = stats.find(i => i.name === name)
      found += item.found
      attempts++

      if (attempts <= 10) {
        currQuestion.accuracy = found / attempts
      }
      currQuestion.attempts = attempts
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

export {
  getIntervalStats,
  getLastSession
}