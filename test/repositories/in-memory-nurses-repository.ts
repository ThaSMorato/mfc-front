import { NursesRepository } from '@/mfc/application/repositories/nurses-repository'

interface Nurse {
  email: string
  password: string
}

export class InMemoryNursesRepository implements NursesRepository {
  public items: Nurse[]

  constructor() {
    this.items = []
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
