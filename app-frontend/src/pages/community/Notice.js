import React from "react";
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableContainer, TableHead } from "@mui/material";
import styled from "styled-components";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';



const Root = styled.div`
width: ${(props) => props.theme.display.lg};
margin: 0 auto;
box-sizing: border-box;
`;

const columns = [
    { id: 'title', label: '제목 ', minWidth: 150, align: 'center' },
    { id: 'day', label: '등록일', minWidth: 100, align: 'center' }
];
function createData(title, day) {
    return {title, day }
}

const rows = [ //임시로 데이터 
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
    createData('자유게시판 서비스 중단 소식을 알려드립니다', '2024-10-28'),
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
color: #3563E9; 
}
`;



export function Notice() {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1);
    };




    return (
        <>
            <Root>
                <Paper sx={{ width: "100%", overflow: 'hidden', }}>
                    <TableContainerStyle sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
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
                </TableHead>

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

            </Root>
        </>
    );
}
export default Notice;

