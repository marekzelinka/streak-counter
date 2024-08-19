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
      const startDate = new Date('12/12/2021')
      // We set the currentCount to 2 so the lastLoginDate must be one day ahead
      const lastLoginDate = new Date('12/13/2021')
      const streak: Streak = {
        currentCount: 2,
        startDate: formatDate(startDate),
        lastLoginDate: formatDate(lastLoginDate),
      }
      mockLocalStorage.setItem(STREAK_KEY, JSON.stringify(streak))
    })

    afterEach(() => {
      mockLocalStorage.clear()
    })

    it('should return the streak from localStorage', () => {
      const date = new Date()
      const streak = streakCounter(mockLocalStorage, date)
      // Should match the dates used to set up the test
      expect(streak.startDate).toBe('12/12/2021')
    })
  })
})
