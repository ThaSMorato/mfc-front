import { api } from '@/infra/api/api-service'
import { ApiHealthUnitsRepository } from '@/infra/api/repositories/api-health-units-repository'
import { FetchAllHealthUnitsUseCase } from '@/mfc/application/use-cases/fetch-all-health-units'

export class ApiFetchAllHealthUnitsFactory {
  static getInstance() {
    const apiHealthUnitsRepository = new ApiHealthUnitsRepository(api)
    const useCaseInstance = new FetchAllHealthUnitsUseCase(
      apiHealthUnitsRepository,
    )

    return useCaseInstance
  }
}
