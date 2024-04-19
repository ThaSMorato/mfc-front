import { createContext, ReactNode, useContext, useState } from 'react'

import { EnvService } from '@/infra/env/env-service'

import { ApiAuthenticateNurseFactory } from '../use-cases-factories/api-authenticate-nurse'

interface HandleAuthenticationParams {
  password: string
  email: string
}

interface NurseContextValues {
  authenticate: {
    isLoading: boolean
    authenticateFunction: ({
      password,
      email,
    }: HandleAuthenticationParams) => Promise<void>
    logoutFunction: () => void
  }
}

interface NurseContextProviderProps {
  children: ReactNode
}

const NurseContext = createContext<NurseContextValues | null>(null)

const authenticateUseCase = ApiAuthenticateNurseFactory.getInstance()

export const NurseContextProvider = ({
  children,
}: NurseContextProviderProps) => {
  const [isAuthenticateLoading, setIsAuthenticateLoading] =
    useState<boolean>(false)

  const handleAuthenticate = async ({
    password,
    email,
  }: HandleAuthenticationParams) => {
    try {
      setIsAuthenticateLoading(true)
      const response = await authenticateUseCase.execute({ email, password })

      if (response.isRight()) {
        const { accessToken } = response.value

        localStorage.setItem(
          EnvService.get('VITE_APP_STORAGE_FLAG'),
          accessToken,
        )
      } else {
        const error = response.value

        console.error(error)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsAuthenticateLoading(false)
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem(EnvService.get('VITE_APP_STORAGE_FLAG'))
  }

  return (
    <NurseContext.Provider
      value={{
        authenticate: {
          authenticateFunction: handleAuthenticate,
          isLoading: isAuthenticateLoading,
          logoutFunction: handleLogOut,
        },
      }}
    >
      {children}
    </NurseContext.Provider>
  )
}

export const useNurse = () => {
  const context = useContext(NurseContext)

  if (!context) {
    throw new Error('No provider on parent components')
  }

  return context
}
