import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { GetNurseProfileUseCase } from '@/mfc/application/use-cases/get-nurse-profile'
import { Nurse } from '@/mfc/domain/entities/nurse'
import { makeNurse } from '$/repositories/factories/make-nurse'
import { InMemoryNursesRepository } from '$/repositories/in-memory-nurses-repository'
import {
  mockNursesRepository,
  nursesMockFunctions,
} from '$/repositories/mock-nurses-repository'

let sut: GetNurseProfileUseCase
let nursesInMemoryRepository: InMemoryNursesRepository

describe('Get current nurse profile use case', () => {
  describe('Unit tests', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      sut = new GetNurseProfileUseCase(mockNursesRepository)
    })

    it('Should call repository and hasher functions and return encrypter response on success', async () => {
      nursesMockFunctions.getCurrentNurse.mockResolvedValue(makeNurse())

      const response = await sut.execute()

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual({
        nurse: expect.any(Nurse),
      })
      expect(nursesMockFunctions.getCurrentNurse).toBeCalled()
    })

    it('Should give an error if nurse is not found', async () => {
      nursesMockFunctions.getCurrentNurse.mockResolvedValue(null)

      const response = await sut.execute()

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(NotAllowedError)
      expect(nursesMockFunctions.getCurrentNurse).toBeCalled()
    })
  })

  describe('Integration tests', () => {
    beforeEach(async () => {
      nursesInMemoryRepository = new InMemoryNursesRepository()

      sut = new GetNurseProfileUseCase(nursesInMemoryRepository)
    })

    it('Should return a token on success', async () => {
      const nurse = makeNurse({
        email: 'a_nurse_email@email.com',
        password: 'pass-123',
      })

      nursesInMemoryRepository.items.push(nurse)
      nursesInMemoryRepository.currentNurseId = String(nurse.id)

      const response = await sut.execute()

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual({
        nurse,
      })
    })

    it('Should give an error if nurse is not found', async () => {
      const response = await sut.execute()

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(NotAllowedError)
    })
  })
})
