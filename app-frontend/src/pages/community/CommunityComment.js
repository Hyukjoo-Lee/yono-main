import styled from 'styled-components';
import { ReactComponent as Profile } from '../../assets/images/Profile.svg';
import CommonHr from '../../common/CommonHr';

const comments = [
  {
    name: '한교동',
    comment: '안녕하세요. 반갑습니다~!',
  },
  {
    name: '포차코',
    comment: '안녕하세요. 반갑습니다~!',
  },
  {
    name: '핀테크',
    comment: '안뇽하세욧ㅇㅇ용',
  },
];

const CommentBox = styled.div`
  width: 1200px;
  // height: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  // border: 1px solid black;

  & > div > div {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: flex-start;
  }
`;
const TopRow = styled.div`
  margin-top: 5px;
  // display: flex;
  // align-items: center;
  // gap: 5px;
  // weight: 50px;
  // height: 50px;
`;
const ImageBox = styled.div`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  & > svg {
    width: 100%;
    height: 100%;
    max-width: 50px;
    max-height: 50px;
    border: 1px solid #d0d0d0;
    border-radius: 50%;
    // margin:10px;
  }
`;

const TextBox = styled.div`
  flex: 1;
  & > p {
    color: ${(props) => props.theme.color.black};
    // margin: 0px auto 20px 55px;
  }
`;

const CommunityComment = () => {
  return (
    <CommentBox>
      {comments.map((comment, index) => {
        return (
          <div key={index}>
            <div>
              <ImageBox>
                <Profile />
              </ImageBox>
              <span>
                <TopRow>
                  <TextBox>
                    <h3 style={{ fontSize: '16px', margin: '0px' }}>
                      {comment.name}
                    </h3>
                    <p>{comment.comment}</p>
                    <p style={{ fontSize: '12px', color: '#757575' }}>
                      2025.01.14. 09:47
                    </p>
                  </TextBox>
                </TopRow>
              </span>
            </div>
            {index !== comments.length - 1 && (
              <CommonHr
                width="1200px"
                borderWidth="1px"
                borderColor="rgba(128, 128, 128, 0.3)"
              />
            )}
          </div>
        );
      })}
    </CommentBox>
  );
};

export default CommunityComment;
