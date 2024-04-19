import { NursesRepository } from '@/mfc/application/repositories/nurses-repository'
import { Nurse } from '@/mfc/domain/entities/nurse'

export class InMemoryNursesRepository implements NursesRepository {
  public items: Nurse[]
  public currentNurseId: string | null

  constructor() {
    this.items = []
    this.currentNurseId = null
  }

  async getCurrentNurse(): Promise<Nurse | null> {
    const nurse = this.items.find(
      (item) => String(item.id) === this.currentNurseId,
    )

    if (!nurse) {
      return null
    }

    return nurse
  }

  async authenticate(email: string, password: string): Promise<string | null> {
    const nurse = this.items.find(
      (item) => item.email === email && item.password === password,
    )

    if (!nurse) {
      return null
    }

    return JSON.stringify(nurse)
  }
}
