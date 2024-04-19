import { HealthUnitContextProvider } from './mfc/hooks/useHealthUnit'
import { NurseContextProvider } from './mfc/hooks/useNurse'
import { NurseShiftContextProvider } from './mfc/hooks/useNurseShift'
import { ToastContextProvider } from './mfc/hooks/useToast'
import { HomePage } from './ui/pages/home'

export const App = () => {
  return (
    <NurseContextProvider>
      <NurseShiftContextProvider>
        <HealthUnitContextProvider>
          <ToastContextProvider>
            <HomePage />
          </ToastContextProvider>
        </HealthUnitContextProvider>
      </NurseShiftContextProvider>
    </NurseContextProvider>
  )
}
