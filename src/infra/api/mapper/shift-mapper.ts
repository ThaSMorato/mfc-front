import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Shift } from '@/mfc/domain/entities/shift'

import { ApiShift } from '../repositories/api-health-units-repository'

export class ShiftMapper {
  static toDomain({
    description,
    endTime,
    healthUnitId,
    id,
    name,
    startTime,
  }: ApiShift): Shift {
    const shift = Shift.create(
      {
        description,
        endTime,
        healthUnitId: new UniqueEntityID(healthUnitId),
        name,
        startTime,
      },
      new UniqueEntityID(id),
    )

    return shift
  }
}
