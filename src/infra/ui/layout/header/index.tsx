import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { LogButton } from '../log-button'

export default function Header() {
  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          MFC
        </Typography>
        <LogButton />
      </Toolbar>
    </>
  )
}
