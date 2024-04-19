import { NurseShift } from '@/mfc/domain/entities/nurse-shift'

export class NurseShiftMapper {
  static toApi({ approved, id, nurseId, shiftId, updatedAt }: NurseShift) {
    return {
      approved,
      id: id ? String(id) : undefined,
      nurseId: id ? String(nurseId) : undefined,
      shiftId,
      updatedAt,
    }
  }
}
