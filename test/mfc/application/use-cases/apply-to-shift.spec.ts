import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ApplyToShiftUseCase } from '@/mfc/application/use-cases/apply-to-shift'
import { NurseShift } from '@/mfc/domain/entities/nurse-shift'
import { makeShift } from '$/repositories/factories/make-shift'
import { InMemoryNurseShiftsRepository } from '$/repositories/in-memory-nurse-shifts-repository'
import {
  mockNurseShiftsRepository,
  nurseShiftsMockFunctions,
} from '$/repositories/mock-nurse-shifts-repository'

let sut: ApplyToShiftUseCase
let nurseShiftsInMemoryRepository: InMemoryNurseShiftsRepository

describe('Fetch all health units use case', () => {
  describe('Unit tests', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      sut = new ApplyToShiftUseCase(mockNurseShiftsRepository)
    })

    it('Should call nurse and shifts find methods and create a nurse shift', async () => {
      const response = await sut.execute({
        shiftId: 'a_shift_id',
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual({
        nurseShift: expect.any(NurseShift),
      })
      expect(nurseShiftsMockFunctions.create).toBeCalledWith(
        expect.any(NurseShift),
      )
    })
  })
  describe('Integration tests', () => {
    beforeEach(() => {
      nurseShiftsInMemoryRepository = new InMemoryNurseShiftsRepository()

      sut = new ApplyToShiftUseCase(nurseShiftsInMemoryRepository)
    })

    it('Should create an nurse shift for the shift that a nurse applyed', async () => {
      const shift = makeShift({}, new UniqueEntityID('shift-id'))

      const response = await sut.execute({
        shiftId: String(shift.id),
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual({
        nurseShift: expect.objectContaining({
          shiftId: shift.id,
          approved: undefined,
        }),
      })
    })
  })
})
