import { AxiosInstance } from 'axios'

import { PaginationParams } from '@/core/repositories/pagination-params'
import { HealthUnitsRepository } from '@/mfc/application/repositories/health-units-repository'
import { HealthUnit } from '@/mfc/domain/entities/health-unit'

import { HealthUnitMapper } from '../mapper/health-unit-mapper'

export interface ApiShift {
  description: string
  endTime: string
  healthUnitId: string
  id: string
  name: string
  startTime: string
}

export interface ApiHealthUnit {
  address: string
  id: string
  latitude: number
  longitude: number
  name: string
  shifts: ApiShift[]
}

interface GetHealthUnitsResponse {
  health_units: ApiHealthUnit[]
}

export class ApiHealthUnitsRepository implements HealthUnitsRepository {
  constructor(private api: AxiosInstance) {}

  async findMany({ page }: PaginationParams): Promise<HealthUnit[]> {
    const { data } = await this.api.get<GetHealthUnitsResponse>(
      '/health-units',
      { params: { page } },
    )

    const { health_units: healthUnits } = data

    return healthUnits.map(HealthUnitMapper.toDomain)
  }
}
