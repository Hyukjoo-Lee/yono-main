//noticeTable 수정전
// import React, { useState } from 'react';
// // import axios from 'axios'; // axios를 임포트합니다.
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
//   Pagination,
//   PaginationItem,
// } from '@mui/material';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import { TableContainer } from '@mui/material';
// import CommonInput from '../../common/CommonInput';
// import searchImg from '../../assets/images/icons-search.png';

// const Root = styled.div`
//   width: ${(props) => props.theme.display.lg};
//   padding-top: 50px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const SearchBox = styled.div`
//   width: 900px;
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   margin-bottom: 20px;

//   img {
//     position: absolute;
//     width: 20px;
//     height: 20px;
//     margin: 8px 10px 0 0;
//   }
// `;

// const TableContainerStyle = styled(TableContainer)`
//   max-height: 600px;
//   overflow-y: auto;
//   &::-webkit-scrollbar {
//     width: 0;
//   }
//   &::-webkit-scrollbar-thumb {
//     background: transparent;
//   }
//   &::-webkit-scrollbar-track {
//     background: transparent;
//   }
// `;

// const PaginationStyle = styled(Pagination)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 16px;

//   & MuiPaginationItem {
//     color: #3563e9;
//   }
// `;
// const rows = [
//   { title: '[공지]공지사항을 알려드립니다', date: '2024-10-28' },
//   { title: '새로운 공지사항입니다.', date: '2024-10-29' },
//   { title: '업데이트 소식입니다.', date: '2024-10-30' },
//   { title: '공지사항을 수정합니다.', date: '2024-11-01' },
//   { title: '시스템 점검 예정 안내', date: '2024-11-02' },
//   { title: '서비스 이용약관 변경 안내', date: '2024-11-03' },
//   { title: '이벤트 참여 방법 안내', date: '2024-11-04' },
//   { title: '사용자 인터페이스 업데이트 안내', date: '2024-11-05' },
//   { title: '버그 수정 및 성능 개선', date: '2024-11-06' },
//   { title: '2024년 새해 인사드립니다.', date: '2024-11-07' },
// ];

// export function NoticeTable() {
//   const [page, setPage] = useState(0);
//   const [searchInput, setSearchInput] = useState('');
//   // const [rows, setRows] = useState([]); // 상태에 rows 추가
//   const [filteredRows, setFilteredRows] = useState(rows);
//   const rowsPerPage = 10;

//   // useEffect(() => {
//   //   // 서버에서 데이터를 받아오는 API 요청
//   //   axios
//   //     .get('https://example.com/api/notice') // 실제 API URL로 변경해야 합니다.
//   //     .then((response) => {
//   //       setRows(response.data); // 받아온 데이터를 상태에 저장
//   //       setFilteredRows(response.data); // 필터링된 데이터도 업데이트
//   //     })
//   //     .catch((error) => {
//   //       console.error('데이터를 가져오는 중 오류 발생:', error);
//   //     });
//   // }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage - 1);
//   };

//   const handleSearch = () => {
//     if (!searchInput.trim()) {
//       setFilteredRows(rows); // 검색어가 없으면 전체 리스트 표시
//     } else {
//       const filtered = rows.filter((row) =>
//         row.title.toLowerCase().includes(searchInput.toLowerCase()),
//       );
//       setFilteredRows(filtered);
//     }
//     setPage(0); // 검색 후 페이지를 처음으로 설정
//   };

//   return (
//     <Root>
//       <SearchBox>
//         <CommonInput
//           width="228px"
//           height="39px"
//           placeholder="제목"
//           value={searchInput}
//           onChange={(e) => setSearchInput(e.target.value)}
//         />
//         <img src={searchImg} alt="검색" onClick={handleSearch} />
//       </SearchBox>

//       <Paper sx={{ width: '918px', overflow: 'hidden', boxShadow: 'none' }}>
//         <TableContainerStyle>
//           <Table stickyHeader aria-label="sticky table">
//             <TableBody>
//               {filteredRows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={index}>
//                     <TableCell
//                       align="left"
//                       sx={{ borderBottom: '0.5px solid #e8e8e8' }}
//                     >
//                       <Link
//                         to="/NoticePost"
//                         state={{ rowData: row }}
//                         style={{
//                           textDecoration: 'none',
//                           color: 'black',
//                         }}
//                       >
//                         {row.title}
//                       </Link>
//                     </TableCell>
//                     <TableCell
//                       align="right"
//                       sx={{ borderBottom: '0.5px solid #e8e8e8' }}
//                     >
//                       {row.date}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainerStyle>

//         <PaginationStyle
//           count={Math.ceil(filteredRows.length / rowsPerPage)}
//           page={page + 1}
//           onChange={handleChangePage}
//           renderItem={(item) => <PaginationItem {...item} />}
//         />
//       </Paper>
//     </Root>
//   );
// }

// export default NoticeTable;

//NoticeTable 수정버전
import React, { useEffect, useState } from 'react';

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
import { Link, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CommonButton from '../../common/CommonButton';
import CommonInput from '../../common/CommonInput';

const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
  margin-top: 70px;
`;

const columns = [
  { id: 'noticeNo', label: '번호', minWidth: 50 },
  { id: 'noticeTitle', label: '제목', minWidth: 150 },
  { id: 'adminId', label: '작성자', minWidth: 100 },
  { id: 'createdAt', label: '등록일', minWidth: 100 },
  { id: 'viewCount', label: '조회', minWidth: 50 },
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
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };
  const handleButtonClick = () => {
    navigate('/noticeFormBox');
  };

  useEffect(() => {
    const getCommunityData = async () => {
      try {
        const response = await axios.get('/notice');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data : ', error);
      }
    };
    getCommunityData();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const handlePostClick = (id) => {
    navigate(`/notice/${id}`);
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
                {rows.length > 0 ? (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        onClick={() => handlePostClick(row.noticeNo)}
                      >
                        {columns.map((column) => {
                          let value = row[column.id];
                          if (column.id === 'createdAt') {
                            value = formatDate(value);
                          }
                          return (
                            <TableCell
                              key={column.id}
                              align="center"
                              sx={{ borderBottom: '0.5px solid #757575' }}
                            >
                              <Link
                                // to="/no"
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
