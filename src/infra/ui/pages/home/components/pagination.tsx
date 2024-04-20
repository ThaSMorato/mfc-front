import { Box, Button } from '@mui/material'

interface PaginationProps {
  pageIndex: number
  setPageIndex: (page: number) => void
}

export const Pagination = ({ pageIndex, setPageIndex }: PaginationProps) => {
  const handleAddPage = () => setPageIndex(pageIndex + 1)
  const handleRemovePage = () => setPageIndex(pageIndex - 1)

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap="8px">
      <Button onClick={handleRemovePage} disabled={pageIndex === 1}>
        {'<'}
      </Button>
      <p>{pageIndex}</p>
      <Button onClick={handleAddPage}> {'>'} </Button>
    </Box>
  )
}
