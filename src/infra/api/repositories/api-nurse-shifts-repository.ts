import { AxiosInstance } from 'axios'

import { NurseShiftsRepository } from '@/mfc/application/repositories/nurse-shifts-repository'
import { NurseShift } from '@/mfc/domain/entities/nurse-shift'

import { NurseShiftMapper } from '../mapper/nurse-shift-mapper'

export class ApiNurseShiftsRepository implements NurseShiftsRepository {
  constructor(private api: AxiosInstance) {}

  async create(nurseShift: NurseShift): Promise<void> {
    const { shiftId } = NurseShiftMapper.toApi(nurseShift)

    await this.api.post(`/shifts/${shiftId}/nurse-shifts`)
  }
}
