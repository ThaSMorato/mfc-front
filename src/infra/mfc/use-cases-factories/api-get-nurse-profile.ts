import { api } from '@/infra/api/api-service'
import { ApiNursesRepository } from '@/infra/api/repositories/api-nurses-repository'
import { GetNurseProfileUseCase } from '@/mfc/application/use-cases/get-nurse-profile'

export class ApiGetNurseProfileFactory {
  static getInstance() {
    const apiNursesRepository = new ApiNursesRepository(api)

    const useCaseInstance = new GetNurseProfileUseCase(apiNursesRepository)

    return useCaseInstance
  }
}
