import { Button, TableCell, TableRow } from '@mui/material'
import { useState } from 'react'

import { HealthUnit } from '@/mfc/domain/entities/health-unit'

import { ShiftsModal } from './shifts-modal'

interface HealthUnitRowProps {
  healthUnit: HealthUnit
}

export const HealthUnitRow = ({ healthUnit }: HealthUnitRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleOnClose = () => setIsModalOpen(false)
  const handleOnOpen = () => setIsModalOpen(true)

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {String(healthUnit.id)}
        </TableCell>
        <TableCell>{healthUnit.name}</TableCell>
        <TableCell>{healthUnit.address}</TableCell>
        <TableCell align="right">
          <Button onClick={handleOnOpen} variant="contained">
            Turnos
          </Button>
        </TableCell>
      </TableRow>
      <ShiftsModal
        isOpen={isModalOpen}
        shifts={healthUnit.shifts}
        onClose={handleOnClose}
        unitName={healthUnit.name}
      />
    </>
  )
}
