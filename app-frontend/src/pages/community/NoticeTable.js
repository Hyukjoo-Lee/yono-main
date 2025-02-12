import {
  Pagination,
  PaginationItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchSearchNotice } from '../../apis/noticeApi';
import CommonButton from '../../common/CommonButton';
import CommonDialog from '../../common/CommonDialog';
import CommonInput from '../../common/CommonInput';

const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
  margin-top: 70px;
`;

const columns = [
  { id: 'noticeNo', label: '번호', minWidth: 50 },
  { id: 'title', label: '제목', minWidth: 150 },
  { id: 'userId', label: '작성자', minWidth: 100 },
  { id: 'createdAt', label: '등록일', minWidth: 100 },
  { id: 'updatedAt', label: '수정일', minWidth: 100 },
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

export function NoticeTable() {
  const { user } = useSelector((state) => state.user);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    getNoticeData(keyword);
  }, [keyword]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleButtonClick = () => {
    const isAdmin = user.userRole === 'ADMIN';

    if (!isAdmin) {
      setIsDialogOpen(true); // 권한이 없으면 다이얼로그를 열기
    } else {
      navigate('/noticeFormBox'); // 관리자라면 폼으로 이동
    }
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSerchSubmit = async () => {
    const { success, data, message } = await fetchSearchNotice(keyword);
    if (success) {
      setRows(data);
    } else {
      alert(`검색 오류: ${message}`);
    }
  };

  const getNoticeData = async (keyword) => {
    try {
      const { success, data } = await fetchSearchNotice(keyword);

      if (success) {
        setRows(data);
      } else {
        setRows([]);
        setPage(0);
      }
    } catch (error) {
      console.error('Error fetching data : ', error);
      setRows([]);
      setPage(0);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Root>
        <Box>
          <CommonInput
            width="228px"
            height="39px"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={handleSearchChange}
          />
          <CommonButton
            width="74px"
            height="39px"
            background="#3563E9"
            color="white"
            text="검색"
            borderRadius="5px"
            onClick={handleSerchSubmit}
          />
        </Box>

        <Container>
          <CommonButton
            width="100px"
            height="39px"
            text="글등록"
            onClick={handleButtonClick}
          />
          {isDialogOpen && (
            <CommonDialog
              open={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              title="접근제한"
              children="관리자 권한 기능입니다."
              submitText="확인"
              onClick={() => setIsDialogOpen(false)}
            />
          )}
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
                {rows.length > 0 ? (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          let value = row[column.id];
                          if (
                            column.id === 'createdAt' ||
                            column.id === 'updatedAt'
                          ) {
                            value = formatDate(value);
                          }
                          return (
                            <TableCell
                              key={column.id}
                              align="center"
                              sx={{ borderBottom: '0.5px solid #757575' }}
                            >
                              <Link
                                to={`/notice/${row.noticeNo}`}
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
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      데이터가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
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
