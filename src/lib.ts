import { differenceInDays } from './utils'

export const STREAK_KEY = 'streak'

export function shouldIncrementOrResetStreakCount(
  currentDate: Date,
  lastLoginDate: Date,
): 'increment' | 'reset' | 'none' {
  const diffInDays = differenceInDays(currentDate, lastLoginDate)

  if (diffInDays === 0) {
    // This means they logged in the same-day
    return 'none'
  }

  // This means they logged in the day after the currentDate
  if (diffInDays === 1) {
    return 'increment'
  }

  // Otherwise they logged in after a day, which breaks the streak
  return 'reset'
}
