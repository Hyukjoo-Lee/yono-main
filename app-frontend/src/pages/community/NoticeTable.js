import React, { useState } from 'react';
// import axios from 'axios'; // axios를 임포트합니다.
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
import { TableContainer } from '@mui/material';
import CommonInput from '../../common/CommonInput';
import searchImg from '../../assets/images/icons-search.png';

const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBox = styled.div`
  width: 900px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;

  img {
    position: absolute;
    width: 20px;
    height: 20px;
    margin: 8px 10px 0 0;
  }
`;

const TableContainerStyle = styled(TableContainer)`
  max-height: 600px;
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

const PaginationStyle = styled(Pagination)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;

  & MuiPaginationItem {
    color: #3563e9;
  }
`;
const rows = [
  { title: '[공지]공지사항을 알려드립니다', date: '2024-10-28' },
  { title: '새로운 공지사항입니다.', date: '2024-10-29' },
  { title: '업데이트 소식입니다.', date: '2024-10-30' },
  { title: '공지사항을 수정합니다.', date: '2024-11-01' },
  { title: '시스템 점검 예정 안내', date: '2024-11-02' },
  { title: '서비스 이용약관 변경 안내', date: '2024-11-03' },
  { title: '이벤트 참여 방법 안내', date: '2024-11-04' },
  { title: '사용자 인터페이스 업데이트 안내', date: '2024-11-05' },
  { title: '버그 수정 및 성능 개선', date: '2024-11-06' },
  { title: '2024년 새해 인사드립니다.', date: '2024-11-07' },
];

export function NoticeTable() {
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  // const [rows, setRows] = useState([]); // 상태에 rows 추가
  const [filteredRows, setFilteredRows] = useState(rows);
  const rowsPerPage = 10;

  // useEffect(() => {
  //   // 서버에서 데이터를 받아오는 API 요청
  //   axios
  //     .get('https://example.com/api/notice') // 실제 API URL로 변경해야 합니다.
  //     .then((response) => {
  //       setRows(response.data); // 받아온 데이터를 상태에 저장
  //       setFilteredRows(response.data); // 필터링된 데이터도 업데이트
  //     })
  //     .catch((error) => {
  //       console.error('데이터를 가져오는 중 오류 발생:', error);
  //     });
  // }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleSearch = () => {
    if (!searchInput.trim()) {
      setFilteredRows(rows); // 검색어가 없으면 전체 리스트 표시
    } else {
      const filtered = rows.filter((row) =>
        row.title.toLowerCase().includes(searchInput.toLowerCase()),
      );
      setFilteredRows(filtered);
    }
    setPage(0); // 검색 후 페이지를 처음으로 설정
  };

  return (
    <Root>
      <SearchBox>
        <CommonInput
          width="228px"
          height="39px"
          placeholder="제목"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <img src={searchImg} alt="검색" onClick={handleSearch} />
      </SearchBox>

      <Paper sx={{ width: '918px', overflow: 'hidden', boxShadow: 'none' }}>
        <TableContainerStyle>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell
                      align="left"
                      sx={{ borderBottom: '0.5px solid #e8e8e8' }}
                    >
                      <Link
                        to="/NoticePost"
                        state={{ rowData: row }}
                        style={{
                          textDecoration: 'none',
                          color: 'black',
                        }}
                      >
                        {row.title}
                      </Link>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ borderBottom: '0.5px solid #e8e8e8' }}
                    >
                      {row.date}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainerStyle>

        <PaginationStyle
          count={Math.ceil(filteredRows.length / rowsPerPage)}
          page={page + 1}
          onChange={handleChangePage}
          renderItem={(item) => <PaginationItem {...item} />}
        />
      </Paper>
    </Root>
  );
}

export default NoticeTable;
