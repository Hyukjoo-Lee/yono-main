import styled from 'styled-components';

import HorizonLine from './HorizontalLine';
import CommonButton from '../../common/CommonButton';
import CommonInput from '../../common/CommonInput';
import { useNavigate } from 'react-router-dom';
const Root = styled.div`
  width: ${(props) => props.theme.display.sm};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  height: 100%;
`;

const Box = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  height: 300px;
  border: 1px solid gray;
  margin-top: 10px;
`;
const Detailbox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;
const Listbox = styled.div`
  margin: 20px 0px 20px 0px;
  display: flex;
  justify-content: start;
  align-items: center;
  & Button {
    margin-top: 6px;
    margin-left: 10px;
  }
`;

const styles = {
  wrapper: {
    margin: 8,
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid #D7D7D7',
    borderRadius: 5,
  },
  contentContainer: {
    marginLeft: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  nameText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentText: {
    color: 'black',
    fontSize: 16,
  },
};
const BackBox = styled.div`
  margin: 20px 0px 20px 0px;
`;
export function CommunityPost() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/Community');
  };
  return (
    <Root>
      <label>제목</label>
      <HorizonLine />
      <Detailbox>
        <label>2024.11.22 | 작성자 OOO |조회수 n</label>
      </Detailbox>
      <Box></Box>

      <Listbox>
        <CommonInput
          width="790px"
          height="50px"
          placeholder="댓글을 입력해주세요."
        />
        <CommonButton
          width="100px"
          height="50px"
          background-color="#3563E9"
          color="white"
          text="등록"
        />
      </Listbox>
      <div style={styles.wrapper}>
        <div style={styles.contentContainer}>
          <span style={styles.nameText}>한교동</span>
          <span stlye={styles.commentText}>안녕하세요~!</span>
        </div>
      </div>
      <div style={styles.wrapper}>
        <div style={styles.contentContainer}>
          <span style={styles.nameText}>포차코</span>
          <span stlyr={styles.commentText}>안녕하세요~!</span>
        </div>
      </div>
      <BackBox>
        <CommonButton
          text="목록으로 돌아가기"
          width="100px"
          height="40px"
          font-size="20px"
          onClick={handleButtonClick}
        />
      </BackBox>
    </Root>
  );
}
export default CommunityPost;
