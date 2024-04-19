import { Nurse } from '@/mfc/domain/entities/nurse'

import { ApiCurrentNurse } from '../repositories/api-nurses-repository'

export class NurseMapper {
  static toDomain({ email, name }: ApiCurrentNurse): Nurse {
    const nurse = Nurse.create({
      email,
      name,
    })

    return nurse
  }
}
