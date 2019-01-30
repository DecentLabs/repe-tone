function getSessionStats(result) {
  return result.reduce((acc, curr) => {
    let attempts = 1
    let found = curr.found ? 1 : 0

    if (acc.has(curr.name)) {
      const currResult = acc.get(curr.name)
      attempts = currResult.attempts + 1
      found += currResult.found
    }
    const accuracy = found / attempts

    acc.set(curr.name, {attempts, found, accuracy})

    return acc
  }, new Map())
}

export {
  getSessionStats
}