import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { HealthUnit } from '@/mfc/domain/entities/health-unit'

import { ApiHealthUnit } from '../repositories/api-health-units-repository'
import { ShiftMapper } from './shift-mapper'

export class HealthUnitMapper {
  static toDomain({
    id,
    address,
    latitude,
    longitude,
    name,
    shifts,
  }: ApiHealthUnit): HealthUnit {
    const healthUnit = HealthUnit.create(
      {
        address,
        latitude,
        longitude,
        name,
        shifts: shifts.map(ShiftMapper.toDomain),
      },
      new UniqueEntityID(id),
    )

    return healthUnit
  }
}
