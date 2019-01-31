function checkProgress(interval, stats) {
  let good = false
  let bad = false
  if (interval.attempts > 10) {
    if (interval.accuracy > 0.9) {
      good = true
    } else {
      bad = true
    }
  }

}