import { Box } from '@mui/material'

import Header from '../../layout/header'
import { HealthUnitList } from './components/health-unit-list'

export const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Box padding="16px">
          <HealthUnitList />
        </Box>
      </main>
    </>
  )
}
