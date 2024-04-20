import { Mock, vi } from 'vitest'

import { NursesRepository } from '@/mfc/application/repositories/nurses-repository'

const authenticate: Mock = vi.fn()
const getCurrentNurse: Mock = vi.fn()

export const nursesMockFunctions = {
  authenticate,
  getCurrentNurse,
}

export const mockNursesRepository: NursesRepository = nursesMockFunctions
