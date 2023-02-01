import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type TableItemProps = {
  tableHeader: string[];
  tableValues: any | undefined;
  onClick?: () => void;
};

const TableItem: FC<TableItemProps> = ({ tableHeader, tableValues }) => {
  return (
    <TableContainer
      component={Paper}
      style={{ width: '90%', marginTop: '60px' }}
    >
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            {tableHeader.map((header, i) => (
              <TableCell key={i} align='center'>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableValues?.map((rows: any, i: number) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {rows.map((value: any, i: number) => (
                <TableCell key={i} align='center'>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableItem;
