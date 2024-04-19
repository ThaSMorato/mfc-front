import { Button, Skeleton } from '@mui/material'
import { useState } from 'react'

import { useNurse } from '@/infra/mfc/hooks/useNurse'

import { LogInModal } from '../log-in-modal'

export const LogButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const {
    profile: { currentNurse, isLoading },
    authenticate: { logoutFunction },
  } = useNurse()

  const handleClose = () => setIsModalOpen(false)
  const handleOpen = () => setIsModalOpen(true)

  if (isLoading) {
    return <Skeleton variant="rectangular" width={80} height={30} />
  }

  return (
    <>
      {currentNurse ? (
        <Button variant="outlined" size="small" onClick={logoutFunction}>
          Log out
        </Button>
      ) : (
        <Button variant="contained" size="small" onClick={handleOpen}>
          Sign up
        </Button>
      )}
      <LogInModal handleClose={handleClose} isOpen={isModalOpen} />
    </>
  )
}
