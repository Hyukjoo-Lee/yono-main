import React from "react";
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableContainer, TableHead } from "@mui/material";
import CommonButton from "../../common/CommonButton";
import CommonInput from "../../common/CommonInput";
import styled from "styled-components";
import Pagination from '@mui/material/Pagination';


const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  padding-bottom: ${(props) => props.theme.contentsPaddingBottom};
`;

const columns = [
  { id: 'Category', label: '카테고리 ', minWidth: 100 },
  { id: 'title', label: '제목 ', minWidth: 150, align: 'center' },
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
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
  createData('공지사항', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
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
  margin-bottom:30px;
  margin-right:50px;
  & button {
  margin-top:5px;
  margin-left: 20px;
  }
`;
const TableRowStyle = styled(TableRow)`
background-color: #F7FAFF;
`;
const TableContainerStyle = styled(TableContainer)`
  max-height: 440px;
  overflow-y: auto;
`;

const PaginationStyle = styled(Pagination)`
  color:"white";
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

export function Community() {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };
  return (
    <>
      <Root>
        <Box>
          <CommonInput width="228px" height="39px" placeholder="검색어를 입력하세요" />
          <CommonButton width="74px" height="39px" background-color="#3563E9" color="white" text="검색" borderRadius="5px" />
        </Box>
        <Paper sx={{ width: "1154px", overflow: 'hidden', }}>
          <TableContainerStyle sx={{ maxHeight: 440 }}>
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
          </TableContainerStyle>

          <PaginationStyle
            count={Math.ceil(rows.length / rowsPerPage)}
            page={page + 1}
            onChange={handleChangePage}
          />

        </Paper>
      </Root>
    </>
  );
}



