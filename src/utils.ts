export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US')
}

const MS_PER_DAY = 1000 * 60 * 60 * 24

// Inspired by https://stackoverflow.com/a/15289883
export function differenceInDays(dateLeft: Date, dateRight: Date): number {
  // Discard the time and time-zone information.
  const dateLeftUTC = Date.UTC(
    dateLeft.getFullYear(),
    dateLeft.getMonth(),
    dateLeft.getDate(),
  )
  const dateRightUTC = Date.UTC(
    dateRight.getFullYear(),
    dateRight.getMonth(),
    dateRight.getDate(),
  )

  const diffInDays = Math.floor((dateRightUTC - dateLeftUTC) / MS_PER_DAY)

  return Math.abs(diffInDays)
}
