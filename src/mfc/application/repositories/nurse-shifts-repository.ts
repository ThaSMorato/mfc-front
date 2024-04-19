import { NurseShift } from '@/mfc/domain/entities/nurse-shift'

export interface NurseShiftsRepository {
  create(nurseShift: NurseShift): Promise<void>
}
