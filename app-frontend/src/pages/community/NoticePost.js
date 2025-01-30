import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommonButton from '../../common/CommonButton';
import CommonHr from '../../common/CommonHr';

const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  height: 100%;
`;

const MoveButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MoveButton = styled.button`
  font-size: ${(props) => props.theme.fontSize.sm};
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bold;
`;

const NoticeHeader = styled.div`
  width: 1200px;
  height: 40px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & p {
    font-weight: bold;
    font-size: ${(props) => props.theme.fontSize.eighteen};
    margin: 0;
  }

  & p span {
    color: #4064e6;
  }
`;

const StyledButton = styled(CommonButton).attrs({
  width: '100px',
  height: '40px',
  fontSize: '20px',
})`
  margin-top: 20px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin: 0 auto;
  & > label.title {
    // margin-top: 20px;
    font-weight: bold;
    font-size: ${(props) => props.theme.fontSize.lg};
  }
  & > label.date {
    color: ${(props) => props.theme.color.gray};
    margin-top: 20px;
  }
`;

const DataBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 500px;
`;
const EditBox = styled.div`
  gap: 10px;
  display: flex;
`;

export function NoticePost() {
  const [noticeData, setnoticeData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`/notice/detail?id=${id}`);
        setnoticeData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching post data : ', error);
      }
    };
    fetchPostData();
  }, [id]);

  const handleButtonClick = () => {
    navigate('/notice/list');
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      // DELETE 요청을 보내기 위해 axios.delete 사용
      await axios.delete(`/notice/delete`, { data: [parseInt(id, 10)] });
      alert('삭제되었습니다!');
      navigate('/notice/list'); // 삭제 후 목록으로 이동
    } catch (error) {
      console.error('삭제 중 오류 발생 : ', error);
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleNavigateToNotice = () => {
    navigate('/noticeList');
  };

  const handleNavigateToNext = () => {
    const nextId = parseInt(id, 10) + 1;
    navigate(`/notice/${nextId}`);
  };
  if (!noticeData) {
    return <div>Loading ..</div>;
  }

  return (
    <Root>
      <MoveButtonWrap>
        <MoveButton onClick={handleNavigateToNotice}>&lt; 목록</MoveButton>
        <MoveButton onClick={handleNavigateToNext}>다음 &gt;</MoveButton>
      </MoveButtonWrap>

      <NoticeHeader>
        <p>
          공지사항 <span>{noticeData.noticeNo}</span>
        </p>
        <EditBox>
          <StyledButton text="수정" onClick={handleButtonClick} />
          <StyledButton text="삭제" onClick={handleDelete} />
        </EditBox>
      </NoticeHeader>

      <CommonHr
        width="1200px"
        margin="20px 0px"
        borderWidth="1.5px"
        borderColor="rgba(128, 128, 128, 0.7)"
      />

      <Box>
        <label className="title">{noticeData.title}</label>

        <label className="date">{noticeData.createdAt}</label>
      </Box>

      <CommonHr />

      <DataBox>{noticeData.content}</DataBox>
    </Root>
  );
}
export default NoticePost;
