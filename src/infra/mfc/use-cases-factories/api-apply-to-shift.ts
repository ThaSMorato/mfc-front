import { api } from '@/infra/api/api-service'
import { ApiNurseShiftsRepository } from '@/infra/api/repositories/api-nurse-shifts-repository'
import { ApplyToShiftUseCase } from '@/mfc/application/use-cases/apply-to-shift'

export class ApiApplyToShiftFactory {
  static getInstance() {
    const apiNurseShiftsRepository = new ApiNurseShiftsRepository(api)
    const useCaseInstance = new ApplyToShiftUseCase(apiNurseShiftsRepository)

    return useCaseInstance
  }
}
