import React from "react";
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableContainer, TableHead } from "@material-ui/core";
import CustomButton from "../../common/CommonButton";
import CustomInput from "../../common/CustomInput";
import styled from "styled-components";

const columns = [
  { id: 'Category', label: '카테고리 ', minWidth: 100 },
  { id: 'title', label: '제목 ', minWidth: 150 },
  { id: 'day', label: '등록일', minWidth: 100 }
];
function createData(Category, title, day) {
  return { Category, title, day }
}

const rows = [
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),

];

const Box = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right:250px;
  & button {
  margin-left: 20px;
  }
`;
const TableRowStyle = styled(TableRow)`
background-color: #F7FAFF;
`;

export function Community() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Box>
        <CustomInput width="228px" height="39px" placeholder="검색어를 입력하세요" />
        <CustomButton width="74px" height="39px" background-color="#3563E9" color="white" text="검색" borderRadius="5px" />
      </Box>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: "50px" }}>
        <Paper sx={{ width: "1154px", overflow: 'hidden', }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRowStyle>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>

                  ))}
                </TableRowStyle>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
}



