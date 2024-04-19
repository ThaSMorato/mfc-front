import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { AuthenticateNurseUseCase } from '@/mfc/application/use-cases/authenticate-nurse'
import { makeNurse } from '$/repositories/factories/make-nurse'
import { InMemoryNursesRepository } from '$/repositories/in-memory-nurses-repository'
import {
  mockNursesRepository,
  nursesMockFunctions,
} from '$/repositories/mock-nurses-repository'

let sut: AuthenticateNurseUseCase
let nursesInMemoryRepository: InMemoryNursesRepository

describe('Fetch all health units use case', () => {
  describe('Unit tests', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      sut = new AuthenticateNurseUseCase(mockNursesRepository)
    })

    it('Should call repository and hasher functions and return encrypter response on success', async () => {
      nursesMockFunctions.authenticate.mockResolvedValue('a-token')

      const response = await sut.execute({
        email: 'a_email',
        password: 'pass',
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual({
        accessToken: 'a-token',
      })
      expect(nursesMockFunctions.authenticate).toBeCalledWith('a_email', 'pass')
    })

    it('Should give an error if nurse is not found', async () => {
      nursesMockFunctions.authenticate.mockResolvedValue(null)

      const response = await sut.execute({
        email: 'a_email',
        password: 'pass',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(NotAllowedError)
      expect(nursesMockFunctions.authenticate).toBeCalledWith('a_email', 'pass')
    })
  })

  describe('Integration tests', () => {
    beforeEach(async () => {
      nursesInMemoryRepository = new InMemoryNursesRepository()

      sut = new AuthenticateNurseUseCase(nursesInMemoryRepository)

      const nurse = makeNurse({
        email: 'a_nurse_email@email.com',
        password: 'pass-123',
      })

      nursesInMemoryRepository.items.push(nurse)
    })

    it('Should return a token on success', async () => {
      const response = await sut.execute({
        email: 'a_nurse_email@email.com',
        password: 'pass-123',
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual({
        accessToken: expect.any(String),
      })
    })

    it('Should give an error if email is not found', async () => {
      const response = await sut.execute({
        email: 'not_a_recorded_email@email.com',
        password: 'pass-123',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(NotAllowedError)
    })

    it('Should give an error if password is not correct', async () => {
      const response = await sut.execute({
        email: 'a_nurse_email@email.com',
        password: 'not_correct_password',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(NotAllowedError)
    })
  })
})
