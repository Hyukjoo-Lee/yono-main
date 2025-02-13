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
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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
  { id: 'category', label: '카테고리 ', minWidth: 50 },
  { id: 'title', label: '제목 ', minWidth: 150 },
  { id: 'userId', label: '작성자 ', minWidth: 100 },
  { id: 'regdate', label: '등록일', minWidth: 100 },
  { id: 'viewcnt', label: '조회', minWidth: 50 },
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
  const [rows, setRows] = useState([]);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const rowsPerPage = 10;
  const location = useLocation();
  const updatePost = location.state?.updatePost;
  console.log(updatePost); // 작성자(userId)와 작성일(regdate)가 포함되어 있는지 확인

  const navigate = useNavigate(); // navigate 훅을 사용
  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate('/communityFormBox');
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleDialogLogin = () => {
    setIsDialogOpen(false);
    navigate('/login');
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  // 검색 버튼 클릭 시 실행되는 함수
  const handleSearch = () => {
    if (!searchInput.trim()) {
      setFilteredRows(rows); // 검색어가 없으면 전체 리스트 표시
    } else {
      const filtered = rows.filter((row) => {
        return (
          (row.title &&
            row.title.toLowerCase().includes(searchInput.toLowerCase())) ||
          (row.userId &&
            row.userId.toLowerCase().includes(searchInput.toLowerCase()))
        );
      });
      const sortedFiltered = filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setFilteredRows(sortedFiltered);
    }
    setPage(0); // 검색 후 페이지를 처음으로 설정
  };

  // 데이터 가져오기
  useEffect(() => {
    axios
      .get('/posts/list')
      .then((response) => {
        const sortedData = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt); // 최신순 정렬
        });
        setRows(sortedData);
        setFilteredRows(sortedData); // 초기에는 전체 데이터 표시
      })
      .catch((error) => {
        console.error('API 요청 실패:', error);
      });
  }, []);

  // 행 클릭 시 상세 페이지로 이동하는 함수
  const handleRowClick = (row) => {
    // navigate로 상세 페이지로 이동하면서 상태를 전달
    axios
      .get(`/posts/list/${row.no}`)
      .then((response) => {
        navigate('/CommunityPost', { state: { rowData: row } });
      })
      .catch((error) => {
        console.log('조회수 증가 실패', error);
      });
  };

  return (
    <Root>
      <Box>
        <CommonInput
          width="228px"
          height="39px"
          placeholder="제목, 작성자"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <CommonButton
          width="74px"
          height="39px"
          background="#3563E9"
          color="white"
          text="검색"
          borderRadius="5px"
          onClick={handleSearch}
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
              {filteredRows.length > 0 ? (
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      onClick={() => handleRowClick(row)} // 행 클릭 시 이벤트 발생
                    >
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align="center"
                          sx={{ borderBottom: '0.5px solid #757575' }}
                        >
                          {row[column.id]}
                        </TableCell>
                      ))}
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

      <CommonDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        children={'로그인 해주세요'}
        onClick={handleDialogLogin}
      />
    </Root>
  );
}

export default CommunityTable;
