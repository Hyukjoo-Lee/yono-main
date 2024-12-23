import styled from 'styled-components';
import CommonButton from '../../common/CommonButton';
import CommonInput from '../../common/CommonInput';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Profile } from '../../assets/images/Profile.svg';
import CommonHr from '../../common/CommonHr';

const comments = [
  {
    name: '한교동',
    time: '1시간전',
    comment: '안녕하세요. 반갑습니다~!',
  },
  {
    name: '포차코',
    time: '30분전',
    comment: '안녕하세요. 반갑습니다~!',
  },
];
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
const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > div {
    padding-left: 20px;
    height: 100px;
    border: 1px solid #d7d7d7;
    border-radius: 20px;
    flex-direction: column;
    gap: 5px;
  }
`;
const TopRow = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  height: 50px;
`;
const ImageBox = styled.div`
  & > svg {
    width: 50px;
    height: 50px;
  }
`;

const TimeText = styled.span`
  color: ${(props) => props.theme.color.lightGray};
  font-size: 12px;
  margin-left: 8px;
  margin-bottom: 5px;
`;
const TextBox = styled.div`
  & > p {
    color: ${(props) => props.theme.color.black};
    margin-left: 25px;
  }
`;
const BottomBox = styled.div`
  display: flex;
  margin: 20px 0px 20px 0px;
  justify-content: flex-end;
  gap: 15px;
`;
const commonButtonProps = {
  width: '80px',
  height: '50px',
};
export function CommunityPost() {
  const navigate = useNavigate();
  const handleNavigateToCommunity = () => {
    navigate('/community');
  };
  const handleNavigateToEditForm = () => {
    navigate('/editFormBox');
  };
  return (
    <Root>
      <label>제목</label>
      <CommonHr
        width="918px"
        borderWidth="2px"
        borderColor="black"
        margin="10px auto 20px"
      />
      <Detailbox>
        <label>2024.11.22 | 작성자 OOO |조회수 n</label>
      </Detailbox>
      <Box></Box>

      <Listbox>
        <CommonInput
          width="810px"
          height="50px"
          placeholder="댓글을 입력해주세요."
        />
        <CommonButton
          background-color="#3563E9"
          color="white"
          text="등록"
          {...commonButtonProps}
        />
      </Listbox>

      <CommentBox>
        {comments.map((comment, index) => {
          return (
            <div key={index}>
              <TopRow>
                <ImageBox>
                  <Profile />
                </ImageBox>
                <h3>
                  {comment.name} <TimeText>{comment.time}</TimeText>
                </h3>
              </TopRow>
              <TextBox>
                <p>{comment.comment}</p>
              </TextBox>
            </div>
          );
        })}
      </CommentBox>

      <BottomBox>
        <CommonButton
          text="목록"
          font-size="20px"
          onClick={handleNavigateToCommunity}
          {...commonButtonProps}
        />
        <CommonButton
          text="수정"
          font-size="20px"
          onClick={handleNavigateToEditForm}
          {...commonButtonProps}
        />
        <CommonButton text="삭제" font-size="20px" {...commonButtonProps} />
      </BottomBox>
    </Root>
  );
}
export default CommunityPost;
