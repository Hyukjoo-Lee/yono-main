
import React from "react";

import styled from "styled-components";
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableContainer, TableHead } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import CommonButton from "../../common/CommonButton";
import { useNavigate } from "react-router-dom";

const columns = [
    { id: 'Category', label: '카테고리 ', minWidth: 100, align: 'center'},
    { id: 'title', label: '제목 ', minWidth: 150, align: 'center' },
    { id: 'day', label: '등록일', minWidth: 100 ,align: 'center'},
    { id: 'check', label: '조회', minWidth: 100 ,align: 'center'}
];
function createData(Category, title, day, check) {
    return { Category, title, day, check }
}

  const rows = [ //임시로 데이터 
    createData('공유', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28',0),
    createData('기타문의', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('정보공유', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('기타문의', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('정보공유', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('기타문의', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('정보공유', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('기타문의', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('정보공유', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('기타문의', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('정보공유', '자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28') 
];

const TableHeadStyle = styled(TableHead)`
background: ${(props) => props.theme.color.lightBlue};
`;

const TableContainerStyle = styled(TableContainer)`
    max-height: 440px;
    overflow-y: auto;
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
    color: #3563E9; 
}
`;
export function CommunityTable() {
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 10;
    const navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1);
    };
    const handleButtonClick = () => {
        navigate('/CommunityFormBox'); 
    };
    return (
        <>
        <Container>
            <CommonButton width="100px" height="39px" text="글쓰기" onClick={handleButtonClick} />
        </Container>
        <Paper sx={{ width: "100%", overflow: 'hidden', }}>
            <TableContainerStyle sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHeadStyle>
                    <TableRow>
                    {columns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                    >
                        {column.label}
                    </TableCell>

                ))}
                </TableRow>
                </TableHeadStyle>
            <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
            renderItem={(item) => (
        <PaginationItem {...item} />
            )}
        />
        </Paper>
        </>
    )

}
export default CommunityTable;
    