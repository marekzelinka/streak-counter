import { describe, expect, it } from 'vitest'
import { shouldIncrementOrResetStreakCount } from '../src/lib'

describe('shouldIncrementOrResetStreakCount', () => {
  it('should returns none on same-day login', () => {
    const date = new Date(
      'Mon Mar 04 2024 12:02:39 GMT+0100 (Central European Standard Time)',
    )
    const lastLoginDate = new Date('03/04/2024')
    const nextAction = shouldIncrementOrResetStreakCount(date, lastLoginDate)
    expect(nextAction).toBe('none')
  })
})
