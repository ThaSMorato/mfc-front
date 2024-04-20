import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'

import { useNurse } from '@/infra/mfc/hooks/useNurse'
import { useNurseShift } from '@/infra/mfc/hooks/useNurseShift'
import { useToast } from '@/infra/mfc/hooks/useToast'
import { Shift } from '@/mfc/domain/entities/shift'

interface ShiftsModalProps {
  shifts: Shift[]
  onClose: () => void
  isOpen: boolean
  unitName: string
}

export const ShiftsModal = ({
  isOpen,
  onClose,
  shifts,
  unitName,
}: ShiftsModalProps) => {
  const {
    applyToShift: { applyToShiftFucntion, isloading },
  } = useNurseShift()

  const { showToast } = useToast()

  const {
    profile: { currentNurse },
  } = useNurse()

  const handleApplyToShift = async (shiftId: string, shiftName: string) => {
    await applyToShiftFucntion(shiftId)
    showToast(`Aplicado para o turno: ${shiftName}`)
  }

  return (
    <Dialog onClose={onClose} open={isOpen} maxWidth="lg">
      <DialogTitle>Turnos - {unitName} </DialogTitle>
      <DialogContent>
        <Box>
          <TableContainer component={Paper}>
            <Table aria-label="shifts table">
              <TableBody>
                {shifts.map((shift) => (
                  <TableRow
                    key={String(shift.id)}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {shift.name}
                    </TableCell>
                    <TableCell>{shift.description}</TableCell>
                    <TableCell>
                      {shift.startTime} - {shift.endTime}
                    </TableCell>
                    <TableCell align="right">
                      {currentNurse && (
                        <Button
                          variant="contained"
                          disabled={isloading}
                          onClick={() =>
                            handleApplyToShift(String(shift.id), shift.name)
                          }
                        >
                          Aplicar
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isloading}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
