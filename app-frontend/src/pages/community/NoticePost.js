import styled from 'styled-components';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonButton from '../../common/CommonButton';
import { useNavigate } from 'react-router-dom';
import HorizonLine from './HorizontalLine';

const Root = styled.div`
  width: ${(props) => props.theme.display.sm};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  height: 100%;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin: 0 auto;
  & > label.title {
    margin-top: 20px;
    font-weight: bold; 
    font-size: 25px;

  }
  & > label.date {
    color: ${(props) => props.theme.color.gray};
    margin-top: 20px;
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
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/community');
  };
  return (
    <Root>
      <CommonPageInfo title={'공지사항'} text={<p></p>} />
      <Box>
        <label className="title">점검시간을 알려드립니다</label>
        <label className="date">2024.11.22</label>
      </Box>
      <HorizonLine />
      <DataBox>공지사항에 대해서 알려드리겠습니다</DataBox>

      <div>
        <BackBox>
          <CommonButton
            text="목록으로 돌아가기"
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
