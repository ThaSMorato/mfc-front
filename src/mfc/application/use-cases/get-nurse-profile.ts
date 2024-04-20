import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Nurse } from '@/mfc/domain/entities/nurse'

import { NursesRepository } from '../repositories/nurses-repository'

type GetNurseProfileUseCaseResponse = Either<NotAllowedError, { nurse: Nurse }>

export class GetNurseProfileUseCase {
  constructor(private nursesRepository: NursesRepository) {}

  async execute(): Promise<GetNurseProfileUseCaseResponse> {
    const nurse = await this.nursesRepository.getCurrentNurse()

    if (!nurse) {
      return left(new NotAllowedError())
    }

    return right({
      nurse,
    })
  }
}
