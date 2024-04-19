import { Box } from '@mui/material'

import Header from '../../layout/header'
import { HealthUnitList } from './components/health-unit-list'

export const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Box sx={{ height: 400, width: '100%' }}>
          <HealthUnitList />
        </Box>
      </main>
    </>
  )
}
