import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

import { HealthUnit } from '@/mfc/domain/entities/health-unit'

import { ApiFetchAllHealthUnitsFactory } from '../use-cases-factories/api-fetch-all-health-units'

interface HealthUnitContextValues {
  fetchAllHealthUnits: {
    fetchAllHealthUnitsFunction: (page?: number) => Promise<void>
    isLoading: boolean
    healthUnits: HealthUnit[] | null
  }
}

interface HealthUnitContextProviderProps {
  children: ReactNode
}

const HealthUnitContext = createContext<HealthUnitContextValues | null>(null)

const fetchAllhealthUnitsUseCase = ApiFetchAllHealthUnitsFactory.getInstance()

export const HealthUnitContextProvider = ({
  children,
}: HealthUnitContextProviderProps) => {
  const [isFetchAllHealthUnitsLoading, setIsFetchAllHealthUnitsLoading] =
    useState<boolean>(false)
  const [healthUnits, setHealthUnits] = useState<HealthUnit[] | null>(null)

  const handleFetchAllHealthUnits = useCallback(async (page: number = 1) => {
    try {
      setIsFetchAllHealthUnitsLoading(true)
      const response = await fetchAllhealthUnitsUseCase.execute({ page })

      if (!response.value) {
        setHealthUnits([])
      } else {
        const { healthUnits } = response.value
        setHealthUnits(healthUnits)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetchAllHealthUnitsLoading(false)
    }
  }, [])

  return (
    <HealthUnitContext.Provider
      value={{
        fetchAllHealthUnits: {
          fetchAllHealthUnitsFunction: handleFetchAllHealthUnits,
          isLoading: isFetchAllHealthUnitsLoading,
          healthUnits,
        },
      }}
    >
      {children}
    </HealthUnitContext.Provider>
  )
}

export const useHealthUnit = () => {
  const context = useContext(HealthUnitContext)

  if (!context) {
    throw new Error('No provider on parent components')
  }

  return context
}
