import { JSDOM } from 'jsdom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { streakCounter } from '../src'
import { STREAK_KEY } from '../src/lib'
import type { Streak } from '../src/types'
import { formatDate } from '../src/utils'

describe('streakCounter', () => {
  let mockLocalStorage: Storage

  beforeEach(() => {
    const mockJSDOM = new JSDOM('', { url: 'https://localhost' })
    mockLocalStorage = mockJSDOM.window.localStorage
  })

  afterEach(() => {
    mockLocalStorage.clear()
  })

  it('should return an object with currentCount, startDate and lastLoginDate', () => {
    const date = new Date()
    const streak = streakCounter(mockLocalStorage, date)
    expect(streak).toHaveProperty('currentCount')
    expect(streak).toHaveProperty('startDate')
    expect(streak).toHaveProperty('lastLoginDate')
  })

  it('should return a streak starting at 1 and keep track of lastLoginDate', () => {
    const date = new Date()
    const streak = streakCounter(mockLocalStorage, date)
    expect(streak.currentCount).toBe(1)
    const formattedDate = formatDate(date)
    expect(streak.lastLoginDate).toBe(formattedDate)
  })

  it('should store the streak in localStorage', () => {
    const date = new Date()
    streakCounter(mockLocalStorage, date)

    const rawStreak = mockLocalStorage.getItem(STREAK_KEY)
    expect(rawStreak).not.toBeNull()
  })

  describe('with a pre-populated streak', () => {
    let mockLocalStorage: Storage

    beforeEach(() => {
      const mockJSDOM = new JSDOM('', { url: 'https://localhost' })
      mockLocalStorage = mockJSDOM.window.localStorage

      // Use a date in the past so it is always the same
      const date = new Date('12/12/2021')
      const streak: Streak = {
        currentCount: 1,
        startDate: formatDate(date),
        lastLoginDate: formatDate(date),
      }
      mockLocalStorage.setItem(STREAK_KEY, JSON.stringify(streak))
    })

    afterEach(() => {
      mockLocalStorage.clear()
    })

    it('should return the streak from localStorage', () => {
      const date = new Date('12/12/2021')
      const streak = streakCounter(mockLocalStorage, date)
      // Should match the dates used to set up the test
      expect(streak.startDate).toBe('12/12/2021')
    })

    it('should increment the streak when login days are consecutive', () => {
      const date = new Date('12/13/2021')
      // It should increment, because this is the day after
      // the streak started and a streak is days in a row.
      const streak = streakCounter(mockLocalStorage, date)
      expect(streak.currentCount).toBe(2)
    })

    it('should not increment the streak when login days are not consecutive', () => {
      const date = new Date('12/14/2021')
      // It should not increment, because this is two days after
      // the streak started.
      const streak = streakCounter(mockLocalStorage, date)
      expect(streak.currentCount).toBe(1)
    })

    it('should save the incremented streak to localStorage', () => {
      const date = new Date('12/13/2021')
      // Call it once, so it updates the streak
      streakCounter(mockLocalStorage, date)

      const rawStreak = mockLocalStorage.getItem(STREAK_KEY)
      // Normally you should wrap in try/catch in case the JSON is invalid,
      // but since we authored it, we can skip this step here
      const streak = JSON.parse(rawStreak!) as Streak
      expect(streak.currentCount).toBe(2)
    })

    it('should reset when login days are not consecutive', () => {
      const date = new Date('12/13/2021')
      const streak = streakCounter(mockLocalStorage, date)
      expect(streak.currentCount).toBe(2)

      // Skip a day and break the streak
      const updatedDate = new Date('12/15/2021')
      const updatedStreak = streakCounter(mockLocalStorage, updatedDate)
      expect(updatedStreak.currentCount).toBe(1)
    })

    it('should not reset the streak for same-day login', () => {
      const date = new Date('12/13/2021')
      // Call it once, so it updates the streak
      streakCounter(mockLocalStorage, date)

      // Simulate same-day login
      const updatedDate = new Date('12/13/2021')
      const updatedStreak = streakCounter(mockLocalStorage, updatedDate)
      expect(updatedStreak.currentCount).toBe(2)
    })

    it('should save the reset streak to localStorage', () => {
      const date = new Date('12/13/2021')
      // Call it once, so it updates the streak
      streakCounter(mockLocalStorage, date)

      // Skip a day and break the streak
      const updatedDate = new Date('12/15/2021')
      // Call it once, so it updates the streak
      streakCounter(mockLocalStorage, updatedDate)

      const rawStreak = mockLocalStorage.getItem(STREAK_KEY)
      // Normally you should wrap in try/catch in case the JSON is invalid,
      // but since we authored it, we can skip this step here
      const streak = JSON.parse(rawStreak!) as Streak
      expect(streak.currentCount).toBe(1)
    })
  })
})
