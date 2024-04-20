import { Alert, Snackbar } from '@mui/material'

interface SuccessToast {
  shouldOpen: boolean
  message: string
  onClose: () => void
}

export const SuccessToast = ({
  message,
  onClose,
  shouldOpen,
}: SuccessToast) => {
  return (
    <Snackbar
      open={shouldOpen}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
