function checkProgress(stats) {
  return stats.map(interval => {
    let good = interval.attempts > 10 && interval.accuracy >= 0.9
    let bad = interval.attempts > 10 && interval.accuracy < 0.9
    return {
      name: interval.name,
      good,
      bad
    }
  })
}

function repeatAfterProgress(intervals) {
  const initArray = ['M3', 'P5', 'P8', 'M2', 'm2', 'm3', 'P4', 'M6', 'tri', 'M7', 'm6', 'm7']
  const progs = intervals.reduce((acc, curr) => {
    let name = curr.name
    let prog = this.getIntervalProgress(name)
    if (prog.bad) {
      acc.bad.push(name)
    } else if (prog.good) {
      acc.good.push(name)
    } else {
      acc.unknown.push(name)
    }
    return acc
  }, {bad: [], good: [], unknown: []})

  if (progs.bad.length >= 2 && progs.good.length > progs.bad.length + 1) {
    const bads = progs.bad.length > 2 ? progs.bad.sort(() => 0.5 - Math.random()).slice(0, 2) : progs.bad
    const goods = progs.good.length > 3 ? progs.bad.sort(() => 0.5 - Math.random()).slice(0, 3) : progs.goods

    const bucket = Array.from({ length: 3 }, () => bads).flat().concat(goods)
    return bucket
  } else if ((progs.bad.length >= 2 && progs.good.length <= progs.bad.length + 1)) {

  }
}

export {
  checkProgress
}