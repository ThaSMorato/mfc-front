import {
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

import { HealthUnitRow } from './health-unit-row'
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
        <Table sx={{ minWidth: 650 }} aria-label="health unit table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Enredeço</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {healthUnits.map((unit) => (
              <HealthUnitRow healthUnit={unit} key={String(unit.id)} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination pageIndex={page} setPageIndex={handleChangePage} />
    </>
  )
}
