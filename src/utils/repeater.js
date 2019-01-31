function checkProgress(stats) {
  return stats.map(interval => {
    interval.good = interval.attempts > 10 && interval.accuracy > 0.9
    interval.bad = interval.attempts > 10 && interval.accuracy < 0.9
    return interval
  })
}

export {
  checkProgress
}