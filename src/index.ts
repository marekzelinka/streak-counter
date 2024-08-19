import { STREAK_KEY } from './lib'
import type { Streak } from './types'
import { formatDate } from './utils'

export function streakCounter(localStorage_: Storage, date: Date): Streak {
  const rawStreak = localStorage_.getItem(STREAK_KEY)
  if (rawStreak) {
    try {
      const streak = JSON.parse(rawStreak) as Streak

      return streak
    } catch (error) {
      console.error('Failed to parse streak from localStorage')
    }
  }

  const streak: Streak = {
    currentCount: 1,
    startDate: formatDate(date),
    lastLoginDate: formatDate(date),
  }

  localStorage_.setItem(STREAK_KEY, JSON.stringify(streak))

  return streak
}
