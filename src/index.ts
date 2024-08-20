import {
  buildStreak,
  shouldIncrementOrResetStreakCount,
  STREAK_KEY,
} from './lib'
import type { Streak } from './types'

export function streakCounter(localStorage_: Storage, date: Date): Streak {
  const rawStreak = localStorage_.getItem(STREAK_KEY)
  if (rawStreak) {
    try {
      const streak = JSON.parse(rawStreak) as Streak
      const nextAction = shouldIncrementOrResetStreakCount(
        date,
        new Date(streak.lastLoginDate),
      )

      let updatedStreak = <Streak>{}

      switch (nextAction) {
        case 'increment': {
          updatedStreak = buildStreak(date, {
            currentCount: streak.currentCount + 1,
            startDate: streak.startDate,
          })
          break
        }
        case 'reset': {
          updatedStreak = buildStreak(date)
          break
        }
        case 'none': {
          updatedStreak = streak
        }
      }

      localStorage_.setItem(STREAK_KEY, JSON.stringify(updatedStreak))

      return updatedStreak
    } catch {
      console.error('Failed to parse streak from localStorage')
    }
  }

  const streak: Streak = buildStreak(date)

  localStorage_.setItem(STREAK_KEY, JSON.stringify(streak))

  return streak
}
