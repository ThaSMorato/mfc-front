import { createContext, ReactNode, useContext, useState } from 'react'

import { ApiApplyToShiftFactory } from '../use-cases-factories/api-apply-to-shift'

interface NurseShiftContextValue {
  applyToShift: {
    applyToShiftFucntion: (shiftId: string) => Promise<void>
    isloading: boolean
  }
}

interface NurseShiftContextProviderProps {
  children: ReactNode
}

const NurseShiftContext = createContext<NurseShiftContextValue | null>(null)

const applyToShiftUseCase = ApiApplyToShiftFactory.getInstance()

export const NurseShiftContextProvider = ({
  children,
}: NurseShiftContextProviderProps) => {
  const [isApplyToShiftLoading, setIsApplyToShiftLoading] =
    useState<boolean>(false)

  const handleApplyToShift = async (shiftId: string) => {
    try {
      setIsApplyToShiftLoading(true)
      await applyToShiftUseCase.execute({ shiftId })
    } catch (error) {
      console.error(error)
    } finally {
      setIsApplyToShiftLoading(false)
    }
  }

  return (
    <NurseShiftContext.Provider
      value={{
        applyToShift: {
          applyToShiftFucntion: handleApplyToShift,
          isloading: isApplyToShiftLoading,
        },
      }}
    >
      {children}
    </NurseShiftContext.Provider>
  )
}

export const useNurseShift = () => {
  const context = useContext(NurseShiftContext)

  if (!context) {
    throw new Error('No provider on parent components')
  }

  return context
}
