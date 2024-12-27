import React, { useState } from 'react';

import styled from 'styled-components';
import {
  Paper,
  Table,
  Pagination,
  PaginationItem,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import CommonButton from '../../common/CommonButton';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CommonInput from '../../common/CommonInput';
import { TableContainer, TableHead } from '@mui/material';

const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
  margin-top: 70px;
`;

const columns = [
  { id: 'category', label: '카테고리 ', minWidth: 50 },
  { id: 'title', label: '제목 ', minWidth: 150 },
  { id: 'author', label: '작성자 ', minWidth: 100 },
  { id: 'day', label: '등록일', minWidth: 100 },
  { id: 'check', label: '조회', minWidth: 50 },
];

function createData(category, title, author, day, check) {
  return { category, title, author, day, check };
}

const rows = [
  //임시로 데이터
  createData(
    '공유',
    '자유게시판 서비스 중단 소식을 알려드립니다',
    '정해인',
    '2024-10-28',
    '5',
  ),
  createData(
    '기타문의',
    '자유게시판 서비스 중단 소식을 알려드립니다',
    '익명',
    '2024-10-28',
    '0',
  ),
  createData(
    '정보공유',
    '자유게시판 서비스 중단 소식을 알려드립니다',
    '익명',
    '2024-10-28',
    '0',
  ),
  createData(
    '기타문의',
    '자유게시판 서비스 중단 소식을 알려드립니다',
    '익명',
    '2024-10-28',
    '0',
  ),
  createData(
    '정보공유',
    '자유게시판 서비스 중단 소식을 알려드립니다',
    '익명',
    '2024-10-28',
    '0',
  ),
  createData(
    '기타문의',
    '자유게시판 서비스 중단 소식을 알려드립니다',
    '익명',
    '2024-10-28',
    '0',
  ),
  createData(
    '정보공유',
    '자유게시판 서비스 중단 소식을 알려드립니다',
    '익명',
    '2024-10-28',
    '0',
  ),
  createData(
    '기타문의',
    '자유게시판 서비스 중단 소식을 알려드립니다',
    '익명',
    '2024-10-28',
    '0',
  ),
  createData(
    '정보공유',
    '자유게시판 서비스 중단 소식을 알려드립니다',
    '익명',
    '2024-10-28',
    '0',
  ),
  createData(
    '기타문의',
    '자유게시판 서비스 중단 소식을 알려드립니다',
    '익명',
    '2024-10-28',
    '0',
  ),
  createData(
    '정보공유',
    '자유게시판 서비스 중단 소식을 알려드립니다',
    '익명',
    '2024-10-28',
    '0',
  ),
];

const TableContainerStyle = styled(TableContainer)`
  max-height: 590px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 15px;
  width: 100%;
  margin-left: -20px;
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
const Box = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-right: 10px;
  margin-bottom: -40px;
  & Button {
    margin-top: 6px;
    margin-left: 10px;
  }
`;
export function CommunityTable() {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };
  const handleButtonClick = () => {
    navigate('/communityFormBox');
  };
  return (
    <>
      <Root>
        <Box>
          <CommonInput
            width="228px"
            height="39px"
            placeholder="검색어를 입력하세요"
          />
          <CommonButton
            width="74px"
            height="39px"
            background="#3563E9"
            color="white"
            text="검색"
            borderRadius="5px"
          />
        </Box>

        <Container>
          <CommonButton
            width="100px"
            height="39px"
            text="글등록"
            onClick={handleButtonClick}
          />
        </Container>
        <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
          <TableContainerStyle>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"
                      style={{ minWidth: column.minWidth }}
                      sx={{ borderBottom: '1px solid #000000' }}
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
                              align="center"
                              sx={{ borderBottom: '0.5px solid #757575' }}
                            >
                              <Link
                                to="/CommunityPost"
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
export default CommunityTable;
