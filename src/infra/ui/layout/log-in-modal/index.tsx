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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useNurse } from '@/infra/mfc/hooks/useNurse'
import { useToast } from '@/infra/mfc/hooks/useToast'

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
  const [error, setError] = useState<string | null>(null)

  const {
    authenticate: { authenticateFunction },
  } = useNurse()

  const { showToast } = useToast()

  const {
    formState: { errors, isLoading },
    register,
    handleSubmit,
  } = useForm<LogInFormSchema>({
    resolver: zodResolver(logInFormSchema),
  })

  const handleLogIn = async ({ email, password }: LogInFormSchema) => {
    try {
      setError(null)
      await authenticateFunction({ password, email })
      handleClose()
      showToast('Entrou com sucesso!')
    } catch (error) {
      setError('Credenciais inválidas')
      console.error(error)
    }
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
          label="Email"
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
          label="Senha"
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
        {!!error && (
          <Typography variant="body1" color="red" mt={2}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  )
}
