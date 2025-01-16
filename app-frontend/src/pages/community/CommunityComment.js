import styled from 'styled-components';
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
  {
    name: '핀테크',
    time: '2시간전',
    comment: '안뇽하세욧ㅇㅇ용',
  },
];

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > div {
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
    border: 1px solid rgba(128, 128, 128, 0.3);
    border-radius: 50px;
    // margin:10px;
  }
`;

const TimeText = styled.span`
  color: ${(props) => props.theme.color.lightGray};
  font-size: 12px;
  margin-left: 8px;
  margin: auto 55px;
`;
const TextBox = styled.div`
  & > p {
    color: ${(props) => props.theme.color.black};
    margin: 0px auto 20px 55px;
  }
`;

const CommunityComment = () => {
  return (
    <CommentBox>
      {comments.map((comment, index) => {
        return (
          <div key={index}>
            <TopRow>
              <ImageBox>
                <Profile />
              </ImageBox>
              <h3 style={{ fontSize: '16px' }}>
                {comment.name} <TimeText>{comment.time}</TimeText>
              </h3>
            </TopRow>
            <TextBox>
              <p>{comment.comment}</p>
              <p>2025.01.14</p>

              {index !== comments.length - 1 && (
                <CommonHr
                  width="1200px"
                  borderWidth="1px"
                  borderColor="rgba(128, 128, 128, 0.3)"
                />
              )}
            </TextBox>
          </div>
        );
      })}
    </CommentBox>
  );
};

export default CommunityComment;
