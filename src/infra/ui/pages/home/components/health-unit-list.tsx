import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useEffect, useState } from 'react'

import { useHealthUnit } from '@/infra/mfc/hooks/useHealthUnit'

import { Pagination } from './pagination'

export const HealthUnitList = () => {
  const [page, setPage] = useState(1)

  const {
    fetchAllHealthUnits: {
      fetchAllHealthUnitsFunction,
      healthUnits,
      isLoading,
    },
  } = useHealthUnit()

  useEffect(() => {
    fetchAllHealthUnitsFunction(page)
  }, [page, fetchAllHealthUnitsFunction])

  const handleChangePage = (newPage: number) => setPage(newPage)

  if (isLoading || !healthUnits) {
    return <p>Loading...</p>
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {healthUnits.map((unit) => (
              <TableRow
                key={String(unit.id)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {String(unit.id)}
                </TableCell>
                <TableCell>{unit.name}</TableCell>
                <TableCell>{unit.address}</TableCell>
                <TableCell align="right">
                  <Button variant="contained">Shifts</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination pageIndex={page} setPageIndex={handleChangePage} />
    </>
  )
}
