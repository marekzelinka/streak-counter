export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US')
}

export function differenceInDays(dateLeft: Date, dateRight: Date): number {
  const diffInTime = differenceInTime(dateLeft, dateRight)
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24))

  return diffInDays
}

function differenceInTime(dateLeft: Date, dateRight: Date): number {
  return Math.abs(dateLeft.getTime() - dateRight.getTime())
}
