import { Nurse } from '@/mfc/domain/entities/nurse'

export interface NursesRepository {
  authenticate(email: string, password: string): Promise<string | null>
  getCurrentNurse(): Promise<Nurse | null>
}
