import styled from 'styled-components';
import CommonButton from '../../common/CommonButton';
import CommonInput from '../../common/CommonInput';
import HeartImg from '../../assets/images/HeartImg.png';
import EmptyHeartImg from '../../assets/images/EmptyHeartImg.png';
import { ReactComponent as Profile } from '../../assets/images/Profile.svg';
import ListIcon from '../../assets/images/ListIcon.png';
import CommonHr from '../../common/CommonHr';

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

const TimeText = styled.span`
  color: ${(props) => props.theme.color.lightGray};
  font-size: 12px;
  margin-left: 8px;
  margin-bottom: 5px;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LikeBox = styled.div`
  border: 1px solid lightGray;
  width: 50px;
  height: 28px;
  display: flex;
  align-items: center;
  margin: 10px 20px 20px 0;
  & > p {
    margin-left: 5px;
  }
`;
const Heart = styled.img`
  margin-left: 5px;
  width: 20px;
  height: 20px;
`;

const ListIconBox = styled.div`
  position: relative;
  cursor: pointer;
  align-items: center;
  width: 40px;
  height: 24px;
  margin-left: auto;
`;
const ListIconImage = styled.img`
  width: 30px;
  height: 24px;
  object-fit: contain;
`;
const OptionsBox = styled.div`
  width: 70px;
  position: absolute;
  top: 30px;
  right: 0;
  background: white;
  box-shadow: 0px 4px 6px rgb(0, 0, 0, 0.1);
  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  & li {
    padding: 10px 15px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

const TextBox = styled.div`
  flex: 1;
  & > p {
    color: ${(props) => props.theme.color.black};
    margin-left: 25px;
  }

  & input {
    width: 95%;
    padding: 12px;
    font-size: 18px;
    box-sizing: border-box;
    margin-top: 5px;

    &:focus {
      border: 2px solid #1976d2;
      outline: none;
    }

    &::placeholder {
      color: #b0b0b0;
    }
  }
`;

const CommunityComment = ({
  commentsData,
  toggleOptions,
  showOptions,
  handleDeletecommentClick,
  setEditingComment,
  setEditedContent,
  editingComment,
  editedContent,
  handleEditChange,
  handleSaveEdit,
  user,
  toggleLike,
}) => {
  const HeartButton = ({ like, onClick }) => {
    return <Heart src={like ? HeartImg : EmptyHeartImg} onClick={onClick} />;
  };
  return (
    <CommentBox>
      {commentsData.map((comment, index) => (
        <div key={index}>
          <TopRow>
            <ImageBox>
              <Profile />
            </ImageBox>
            <h3>
              {comment.userId} <TimeText>{comment.regdate}</TimeText>
            </h3>
            <ListIconBox onClick={() => toggleOptions(comment.rno)}>
              <ListIconImage src={ListIcon} alt="옵션 아이콘" />
              {showOptions[comment.rno] && (
                <OptionsBox>
                  <ul>
                    <li
                      key={`delete-${comment.rno}`}
                      onClick={() => handleDeletecommentClick(comment.rno)}
                    >
                      삭제
                    </li>
                    <li
                      key={`edit-${comment.rno}`}
                      onClick={() => {
                        setEditingComment(comment.rno);
                        setEditedContent(comment.r_content); // 기존 댓글 내용을 상태에 설정
                      }}
                    >
                      수정
                    </li>
                  </ul>
                </OptionsBox>
              )}
            </ListIconBox>
          </TopRow>
          <BottomRow>
            <TextBox>
              {editingComment === comment.rno ? (
                <CommonInput
                  type="text"
                  value={editedContent}
                  onChange={handleEditChange}
                  placeholder="댓글을 수정하세요"
                />
              ) : (
                <p>{comment.r_content}</p> // 수정이 완료되면 텍스트만 보이게 함
              )}
            </TextBox>
            {editingComment === comment.rno && (
              <CommonButton
                text="저장"
                onClick={() => handleSaveEdit(comment.rno)}
              />
            )}
            {editingComment !== comment.rno && (
              <>
                <LikeBox>
                  {user ? (
                    <HeartButton
                      like={comment.likedByUser.includes(user.userId)} // userId가 likedByUser에 포함되면 하트가 채워짐
                      onClick={() => toggleLike(comment.rno)} // 하트를 클릭하면 toggleLike 실행
                    />
                  ) : (
                    <HeartButton like={false} /> // user가 없으면 빈 하트로 표시
                  )}
                  <p>{comment.like_count}</p>
                </LikeBox>
              </>
            )}
          </BottomRow>
          <CommonHr
            width="1200px"
            borderWidth="1px"
            borderColor="rgba(128, 128, 128, 0.3)"
          />
        </div>
      ))}
    </CommentBox>
  );
};

export default CommunityComment;
