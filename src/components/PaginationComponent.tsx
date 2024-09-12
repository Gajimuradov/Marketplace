import { TablePagination, Box } from '@mui/material';
import { ChangeEvent } from 'react';

interface PaginationProps {
  total: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PaginationComponent = ({
  total,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <TablePagination
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage="Элементов на странице"
      />
    </Box>
  );
};

export default PaginationComponent;
