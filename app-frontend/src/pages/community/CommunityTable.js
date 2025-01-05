import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate를 임포트
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
import styled from 'styled-components';
import CommonButton from '../../common/CommonButton';
import CommonInput from '../../common/CommonInput';
// import CommonDialog from '../../common/CommonDialog';

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
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const rowsPerPage = 10;
  const navigate = useNavigate(); // navigate 훅을 사용

  // useEffect(() => {
  //   const storedUserId = localStorage.getItem('userId');
  //   if (storedUserId) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  // const handleButtonClick = () => {
  //   const storedUserId = localStorage.getItem('userId');
  //   if (storedUserId) {
  //     // 로그인되어 있으면 글쓰기 폼으로 이동
  //     navigate('/communityFormBox');
  //   } else {
  //     // 로그인되지 않은 경우, 로그인 상태를 변경하여 다이얼로그를 띄움
  //     setIsLoggedIn(true);
  //   }
  // };

  // const handleDialogLogin = () => {
  //   setIsLoggedIn(false);
  //   navigate('/login');
  // };

  // const handleDialogClose = () => {
  //   setIsLoggedIn(false);
  // };

  const handleButtonClick = () => {
    navigate('/communityFormBox');
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
          (row.author &&
            row.author.toLowerCase().includes(searchInput.toLowerCase()))
        );
      });
      setFilteredRows(filtered);
    }
    setPage(0); // 검색 후 페이지를 처음으로 설정
  };

  // 데이터 가져오기
  useEffect(() => {
    axios
      .get('/posts/list')
      .then((response) => {
        setRows(response.data);
        setFilteredRows(response.data); // 초기에는 전체 데이터 표시
      })
      .catch((error) => {
        console.error('API 요청 실패:', error);
      });
  }, []);

  // 행 클릭 시 상세 페이지로 이동하는 함수
  const handleRowClick = (row) => {
    // navigate로 상세 페이지로 이동하면서 상태를 전달
    navigate('/CommunityPost', { state: { rowData: row } });
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
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      onClick={() => handleRowClick(row)} // 행 클릭 시 이벤트 발생
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align="center"
                            sx={{ borderBottom: '0.5px solid #757575' }}
                          >
                            {value}
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

      {/* <CommonDialog
        open={isLoggedIn}
        onClose={handleDialogClose}
        children={'로그인 해주세요'}
        onClick={handleDialogLogin}
      /> */}
    </Root>
  );
}
export default CommunityTable;
