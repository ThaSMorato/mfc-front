import { act, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { EnvService } from '@/infra/env/env-service'
import { NurseContextProvider, useNurse } from '@/infra/mfc/hooks/useNurse'
import { AuthenticateNurseUseCase } from '@/mfc/application/use-cases/authenticate-nurse'
import { GetNurseProfileUseCase } from '@/mfc/application/use-cases/get-nurse-profile'
import { makeNurse } from '$/repositories/factories/make-nurse'

const mockAuthenticateExecute = vitest.spyOn(
  AuthenticateNurseUseCase.prototype,
  'execute',
)

const mockProfileExecute = vitest.spyOn(
  GetNurseProfileUseCase.prototype,
  'execute',
)

const mockGet = vitest.spyOn(EnvService, 'get')

const TestComponent = () => {
  const {
    authenticate: { authenticateFunction, logoutFunction },
    profile: { currentNurse },
  } = useNurse()

  return (
    <>
      {currentNurse ? (
        <button onClick={() => logoutFunction()}>Logout</button>
      ) : (
        <button
          onClick={() =>
            authenticateFunction({
              email: 'aemail@mail.com',
              password: '12345678',
            })
          }
        >
          Login
        </button>
      )}
      <p>{currentNurse ? currentNurse.name : 'Visitor'}</p>
    </>
  )
}

const sut = () => {
  render(
    <NurseContextProvider>
      <TestComponent />
    </NurseContextProvider>,
  )
}

describe('Use Nurse Hook', () => {
  it('Should start with no a visitor state, on login/logout should update', async () => {
    mockAuthenticateExecute.mockResolvedValue(
      right({ accessToken: 'a-access-token' }),
    )
    mockGet.mockReturnValue('@mfc:test-flag')
    mockProfileExecute.mockRejectedValueOnce(left(new NotAllowedError()))

    sut()

    const loginButton = screen.getByText('Login')
    const visitorState = screen.getByText('Visitor')

    expect(loginButton).toBeInTheDocument()
    expect(visitorState).toBeInTheDocument()
    expect(mockProfileExecute).toBeCalledTimes(1)

    mockProfileExecute.mockResolvedValue(
      right({ nurse: makeNurse({ name: 'Test nurse' }) }),
    )

    act(() => {
      loginButton.click()
    })

    expect(mockAuthenticateExecute).toBeCalledTimes(1)

    let logoutButton: HTMLElement

    await waitFor(() => {
      logoutButton = screen.getByText('Logout')
      expect(screen.getByText('Test nurse')).toBeInTheDocument()
      expect(logoutButton).toBeInTheDocument()
    })

    act(() => {
      logoutButton.click()
    })

    expect(mockGet).toBeCalledTimes(2)
  })
})
