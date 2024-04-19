import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NurseShift } from '@/mfc/domain/entities/nurse-shift'

import { NurseShiftsRepository } from '../repositories/nurse-shifts-repository'

interface ApplyToShiftUseCaseRequest {
  shiftId: string
}

type ApplyToShiftUseCaseResponse = Either<null, { nurseShift: NurseShift }>

export class ApplyToShiftUseCase {
  constructor(private nurseShiftsRepository: NurseShiftsRepository) {}

  async execute({
    shiftId,
  }: ApplyToShiftUseCaseRequest): Promise<ApplyToShiftUseCaseResponse> {
    const nurseShift = NurseShift.create({
      shiftId: new UniqueEntityID(shiftId),
    })

    await this.nurseShiftsRepository.create(nurseShift)

    return right({
      nurseShift,
    })
  }
}
