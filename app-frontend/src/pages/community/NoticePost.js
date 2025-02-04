import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommonButton from '../../common/CommonButton';
import CommonHr from '../../common/CommonHr';
// import CommonPageInfo from '../../common/CommonPageInfo';

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
    font-size: 25px;
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
const BackBox = styled.div`
  margin: 20px 0px 20px 0px;
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
      <p style={{ fontWeight: 'bold', fontSize: '18px' }}>
        공지사항 <span style={{ color: '#4064e6' }}>{noticeData.noticeNo}</span>
      </p>
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

      <div>
        <BackBox>
          <CommonButton
            text="목록"
            width="100px"
            height="40px"
            font-size="20px"
            onClick={handleButtonClick}
            style={{
              marginTop: '20px',
            }}
          />
        </BackBox>
      </div>
    </Root>
  );
}
export default NoticePost;
