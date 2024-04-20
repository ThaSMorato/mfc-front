import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { EnvService } from '@/infra/env/env-service'
import { Nurse } from '@/mfc/domain/entities/nurse'

import { ApiAuthenticateNurseFactory } from '../use-cases-factories/api-authenticate-nurse'
import { ApiGetNurseProfileFactory } from '../use-cases-factories/api-get-nurse-profile'

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
  profile: {
    currentNurse: Nurse | null
    isLoading: boolean
  }
}

interface NurseContextProviderProps {
  children: ReactNode
}

const NurseContext = createContext<NurseContextValues | null>(null)

const authenticateUseCase = ApiAuthenticateNurseFactory.getInstance()
const getNurseProfileUseCase = ApiGetNurseProfileFactory.getInstance()

export const NurseContextProvider = ({
  children,
}: NurseContextProviderProps) => {
  const [isAuthenticateLoading, setIsAuthenticateLoading] =
    useState<boolean>(false)
  const [isCurrentNurseLoading, setIsCurrentNurseLoading] =
    useState<boolean>(false)
  const [currentNurse, setCurrentNurse] = useState<Nurse | null>(null)

  const handleFetchCurrentNurse = async () => {
    try {
      setIsCurrentNurseLoading(true)
      const response = await getNurseProfileUseCase.execute()

      if (response.isLeft()) {
        setCurrentNurse(null)
        localStorage.removeItem(EnvService.get('VITE_APP_STORAGE_FLAG'))
      } else {
        const { nurse } = response.value
        setCurrentNurse(nurse)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsCurrentNurseLoading(false)
    }
  }

  useEffect(() => {
    handleFetchCurrentNurse()
  }, [])

  const handleAuthenticate = async ({
    password,
    email,
  }: HandleAuthenticationParams) => {
    setIsAuthenticateLoading(true)
    const response = await authenticateUseCase.execute({ email, password })

    if (response.isRight()) {
      const { accessToken } = response.value

      localStorage.setItem(EnvService.get('VITE_APP_STORAGE_FLAG'), accessToken)

      await handleFetchCurrentNurse()
      setIsAuthenticateLoading(false)
    } else {
      setIsAuthenticateLoading(false)
      const error = response.value

      throw error
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem(EnvService.get('VITE_APP_STORAGE_FLAG'))
    setCurrentNurse(null)
  }

  return (
    <NurseContext.Provider
      value={{
        authenticate: {
          authenticateFunction: handleAuthenticate,
          isLoading: isAuthenticateLoading,
          logoutFunction: handleLogOut,
        },
        profile: {
          currentNurse,
          isLoading: isCurrentNurseLoading,
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
