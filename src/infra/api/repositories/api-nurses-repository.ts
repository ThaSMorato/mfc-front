import { AxiosInstance } from 'axios'

import { NursesRepository } from '@/mfc/application/repositories/nurses-repository'
import { Nurse } from '@/mfc/domain/entities/nurse'

import { NurseMapper } from '../mapper/nurse-mapper'

interface AuthenticateResponse {
  access_token: string
}

export interface ApiCurrentNurse {
  name: string
  email: string
}

interface CurrentNurseResponse {
  profile: ApiCurrentNurse
}

export class ApiNursesRepository implements NursesRepository {
  constructor(private api: AxiosInstance) {}

  async getCurrentNurse(): Promise<Nurse | null> {
    try {
      const { data } = await this.api.get<CurrentNurseResponse>('/profile')

      const { profile } = data

      return NurseMapper.toDomain(profile)
    } catch (error) {
      console.error(error)
      return null
    }
  }

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
