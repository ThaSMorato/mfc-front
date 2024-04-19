import { PaginationParams } from '@/core/repositories/pagination-params'
import { HealthUnit } from '@/mfc/domain/entities/health-unit'

export interface HealthUnitsRepository {
  findMany(params: PaginationParams): Promise<HealthUnit[]>
}
