import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Pagination,
  PaginationItem,
} from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TableContainer, TableHead } from '@mui/material';
const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  box-sizing: border-box;
  margin-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const columns = [
  { id: 'title', label: '제목 ', minWidth: 150, align: 'center' },
  { id: 'day', label: '등록일', minWidth: 100, align: 'center' },
];
function createData(title, day) {
  return { title, day };
}

const rows = [
  //임시로 데이터
  createData('공지사항을 알려드립니다', '2024-10-28'),
  createData('공지사항을 알려드립니다', '2024-10-28'),
  createData('공지사항을 알려드립니다', '2024-10-28'),
  createData('공지사항을 알려드립니다', '2024-10-28'),
  createData('공지사항을 알려드립니다', '2024-10-28'),
  createData('공지사항을 알려드립니다', '2024-10-28'),
  createData('공지사항을 알려드립니다', '2024-10-28'),
  createData('공지사항을 알려드립니다', '2024-10-28'),
  createData('공지사항을 알려드립니다', '2024-10-28'),
  createData('공지사항을 알려드립니다', '2024-10-28'),
  createData('공지사항을 알려드립니다', '2024-10-28'),
];

const TableContainerStyle = styled(TableContainer)`
  max-height: 440px;
  overflow-y: auto;
`;

const PaginationStyle = styled(Pagination)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;

  & MuiPaginationItem {
    color: #3563e9;
  }
`;

export function NoticeTable() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  return (
    <>
      <Root>
        <Paper sx={{ width: '918px', overflow: 'hidden', boxShadow: 'none' }}>
          <TableContainerStyle>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sx={{
                        borderBottom: '1px solid #000000',
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{ borderBottom: '0.5px solid #757575' }}
                            >
                              <Link
                                to="/NoticePost"
                                state={{ rowData: row }}
                                style={{
                                  textDecoration: 'none',
                                  color: 'black',
                                }}
                              >
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </Link>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainerStyle>

          <PaginationStyle
            count={Math.ceil(rows.length / rowsPerPage)}
            page={page + 1}
            onChange={handleChangePage}
            renderItem={(item) => <PaginationItem {...item} />}
          />
        </Paper>
      </Root>
    </>
  );
}
export default NoticeTable;
