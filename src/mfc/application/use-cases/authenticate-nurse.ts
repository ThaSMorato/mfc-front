import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

import { NursesRepository } from '../repositories/nurses-repository'

interface AuthenticateNurseUseCaseRequest {
  email: string
  password: string
}

type AuthenticateNurseUseCaseResponse = Either<
  NotAllowedError,
  {
    accessToken: string
  }
>

export class AuthenticateNurseUseCase {
  constructor(private nursesRepository: NursesRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateNurseUseCaseRequest): Promise<AuthenticateNurseUseCaseResponse> {
    const accessToken = await this.nursesRepository.authenticate(
      email,
      password,
    )

    if (!accessToken) {
      return left(new NotAllowedError())
    }

    return right({
      accessToken,
    })
  }
}
