import { differenceInDays } from './utils'

export const STREAK_KEY = 'streak'

export function shouldIncrementOrResetStreakCount(
  currentDate: Date,
  lastLoginDate: Date,
): 'increment' | undefined {
  const diffInDays = differenceInDays(currentDate, lastLoginDate)

  if (diffInDays === 1) {
    // This means they logged in the day after the currentDate
    return 'increment'
  }

  // Otherwise they logged in after a day, which breaks the streak
  return undefined
}
