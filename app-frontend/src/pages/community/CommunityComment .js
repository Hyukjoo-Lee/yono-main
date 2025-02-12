import styled from 'styled-components';
import CommonButton from '../../common/CommonButton';
import CommonInput from '../../common/CommonInput';
import EmptyHeartImg from '../../assets/images/EmptyHeartImg.png';
import { ReactComponent as Profile } from '../../assets/images/Profile.svg';
import ListIcon from '../../assets/images/ListIcon.png';
import CommonHr from '../../common/CommonHr';
const CommentBox = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > div > div {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: flex-start;
  }
`;

const TopRow = styled.div`
  margin-top: 5px;
`;

const ImageBox = styled.div`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d0d0d0;
  border-radius: 50%;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  & svg {
    width: 100%;
    height: 100%;
    max-width: 50px;
    max-height: 50px;
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
    return <Heart src={EmptyHeartImg} onClick={onClick} />;
  };

  const handleDelete = (rno) => {
    handleDeletecommentClick(rno);

    commentsData = commentsData.filter((comment) => comment.rno !== rno);
  };

  const handleSave = (rno) => {
    handleSaveEdit(rno);
    commentsData = commentsData.map((comment) =>
      comment.rno === rno ? { ...comment, r_content: editedContent } : comment,
    );
  };

  return (
    <CommentBox>
      {commentsData.map((comment, index) => (
        <div key={index}>
          <TopRow>
            <ImageBox>
              {comment.profile && comment.profile !== 'temp_profile' ? (
                <img
                  src={`http://localhost:8065${comment.profile}`}
                  alt="프로필"
                />
              ) : (
                <Profile />
              )}
            </ImageBox>
            <h3>
              {comment.userId}{' '}
              <TimeText>
                {new Date(comment.regdate).toISOString().split('T')[0]}
              </TimeText>
            </h3>
            <ListIconBox onClick={() => toggleOptions(comment.rno)}>
              <ListIconImage src={ListIcon} alt="옵션 아이콘" />
              {showOptions[comment.rno] && (
                <OptionsBox>
                  <ul>
                    <li
                      key={`delete-${comment.rno}`}
                      onClick={() => handleDelete(comment.rno)}
                    >
                      삭제
                    </li>
                    <li
                      key={`edit-${comment.rno}`}
                      onClick={() => {
                        setEditingComment(comment.rno);
                        setEditedContent(comment.r_content);
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
                <p>{comment.r_content}</p>
              )}
            </TextBox>
            {editingComment === comment.rno && (
              <CommonButton
                text="저장"
                onClick={() => handleSave(comment.rno)}
              />
            )}
            {editingComment !== comment.rno && (
              <LikeBox>
                {user ? (
                  <HeartButton
                    like={comment.likedByUser.includes(user.userId)}
                    onClick={() => toggleLike(comment.rno)}
                  />
                ) : (
                  <HeartButton like={false} />
                )}
                <p>{comment.like_count}</p>
              </LikeBox>
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
