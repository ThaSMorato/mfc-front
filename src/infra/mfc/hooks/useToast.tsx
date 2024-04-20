import React, { createContext, ReactNode, useContext, useState } from 'react'

import { SuccessToast } from '@/infra/ui/common/components/success-toast'

interface ToastContextValue {
  showToast: (message: string) => void
}

interface ToastContextProviderProps {
  children: ReactNode
}

const ToastContext = createContext<ToastContextValue | null>(null)

export const ToastContextProvider = ({
  children,
}: ToastContextProviderProps) => {
  const [shouldOpen, setShouldOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('It was a success!!')

  const handleClose = () => setShouldOpen(false)

  const handleShowToast = (msg: string) => {
    setMessage(msg)
    setShouldOpen(true)
  }

  return (
    <ToastContext.Provider
      value={{
        showToast: handleShowToast,
      }}
    >
      {children}
      <SuccessToast
        message={message}
        onClose={handleClose}
        shouldOpen={shouldOpen}
      />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('No provider on parent components')
  }

  return context
}
