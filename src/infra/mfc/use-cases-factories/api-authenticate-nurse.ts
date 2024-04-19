import { api } from '@/infra/api/api-service'
import { ApiNursesRepository } from '@/infra/api/repositories/api-nurses-repository'
import { AuthenticateNurseUseCase } from '@/mfc/application/use-cases/authenticate-nurse'

export class ApiAuthenticateNurseFactory {
  static getInstance() {
    const apiNursesRepository = new ApiNursesRepository(api)
    const useCaseInstance = new AuthenticateNurseUseCase(apiNursesRepository)

    return useCaseInstance
  }
}
