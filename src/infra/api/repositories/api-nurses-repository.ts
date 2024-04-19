import { AxiosInstance } from 'axios'

import { NursesRepository } from '@/mfc/application/repositories/nurses-repository'

interface AuthenticateResponse {
  access_token: string
}

export class ApiNursesRepository implements NursesRepository {
  constructor(private api: AxiosInstance) {}

  async authenticate(email: string, password: string): Promise<string | null> {
    try {
      const { data } = await this.api.post<AuthenticateResponse>('/sessions', {
        email,
        password,
      })

      const { access_token: accessToken } = data

      return accessToken
    } catch (e) {
      console.error(e)

      return null
    }
  }
}
