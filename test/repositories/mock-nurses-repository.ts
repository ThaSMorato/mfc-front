import { Mock, vi } from 'vitest'

import { NursesRepository } from '@/mfc/application/repositories/nurses-repository'

const authenticate: Mock = vi.fn()

export const nursesMockFunctions = {
  authenticate,
}

export const mockNursesRepository: NursesRepository = nursesMockFunctions
