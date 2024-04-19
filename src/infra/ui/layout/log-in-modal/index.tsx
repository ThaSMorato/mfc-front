import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useNurse } from '@/infra/mfc/hooks/useNurse'

interface LogInModalProps {
  isOpen: boolean
  handleClose: () => void
}

const logInFormSchema = z.object({
  password: z.string().min(4),
  email: z.string().email(),
})

type LogInFormSchema = z.infer<typeof logInFormSchema>

export const LogInModal = ({ handleClose, isOpen }: LogInModalProps) => {
  const {
    authenticate: { authenticateFunction },
  } = useNurse()
  const {
    formState: { errors, isLoading },
    register,
    handleSubmit,
  } = useForm<LogInFormSchema>({
    resolver: zodResolver(logInFormSchema),
  })

  const handleLogIn = async ({ email, password }: LogInFormSchema) => {
    await authenticateFunction({ password, email })
    handleClose()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(handleLogIn),
      }}
    >
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          label="Email Address"
          type="text"
          fullWidth
          variant="standard"
          {...register('email')}
          error={!!errors.email}
        />
        {!!errors.email && (
          <Typography variant="body1" color="red" mt={2}>
            {errors.email.message}
          </Typography>
        )}
        <TextField
          autoFocus
          required
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          {...register('password')}
          error={!!errors.password}
        />
        {!!errors.password && (
          <Typography variant="body1" color="red" mt={2}>
            {errors.password.message}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  )
}
