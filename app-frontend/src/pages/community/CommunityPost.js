import styled from 'styled-components';
import CommonButton from '../../common/CommonButton';
import CommonDialog from '../../common/CommonDialog';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Profile } from '../../assets/images/Profile.svg';
import CommonHr from '../../common/CommonHr';
import HeartImg from '../../assets/images/HeartImg.png';
import EmptyHeartImg from '../../assets/images/EmptyHeartImg.png';
import ListIcon from '../../assets/images/ListIcon.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CommonInput from '../../common/CommonInput';

const Root = styled.div`
  width: ${(props) => props.theme.display.sm};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  height: 100%;
`;

const Listbox = styled.div`
  border: 1px solid lightGray;
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 0px;
  box-sizing: border-box;

  & textarea {
    resize: none;
    background-color: #f8f9fe;
    resize: none;
    font-size: 16px;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    padding-left: 9px;
    border: transparent;
    border-bottom: 1px solid lightgray;
  }

  & textarea:focus {
    border: 1px solid #1976d2;
    outline: none;
  }
  & textarea::placeholder {
    font-size: 16px;
    color: #b0b0b0;
  }
`;

const Replybox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & p {
    display: flex;
    align-items: center;
    margin: 0 0 0 10px;
  }
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: height 0.3s ease;
  max-height: ${(props) => (props.isEditing ? '500px' : '200px')};
  & > div {
    height: auto;
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
  margin: 0 20px 20px 0;
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
const HeartButton = ({ like, onClick }) => {
  return <Heart src={like ? HeartImg : EmptyHeartImg} onClick={onClick} />;
};

const TextBox = styled.div`
  & > p {
    color: ${(props) => props.theme.color.black};
    margin-left: 25px;
  }

  & > input {
    width: 100%;
    padding: 9px;
    font-size: 16px;
    box-sizing: border-box;
    margin-top: 5px;

    &:focus {
      border: 1px solid #1976d2;
      outline: none;
    }

    &::placeholder {
      color: #b0b0b0;
    }
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
  const location = useLocation();
  const [showOptions, setShowOptions] = useState(false);
  const { rowData } = location.state;
  const [comment, setComment] = useState('');
  const [commentsData, setCommentsData] = useState([]); // 댓글 데이터를 배열로 관리
  const [inputCount, setInputCount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // 로그인 상태 확인
  const [editingComment, setEditingComment] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const MAX_LENGTH = 100;
  const navigate = useNavigate();

  const toggleOptions = (rno) => {
    setShowOptions((prev) => ({
      ...prev,
      [rno]: !prev[rno], // 선택된 댓글의 옵션만 토글
    }));
  };

  const handleSubmit = async () => {
    if (!isLoggedIn || !user) {
      // user가 null일 경우 체크
      setIsDialogOpen(true);
      return;
    }
    try {
      const replyData = {
        r_content: comment,
        userId: user.userId,
        pno: rowData.no,
        like_count: 0,
      };

      const response = await axios.post('/reply/add', replyData);

      if (response.status === 200) {
        setCommentsData((prev) => [
          ...prev,
          {
            ...replyData, // 클라이언트에서 보낸 데이터
            rno: response.data.rno, // 서버에서 반환된 댓글 고유 번호 (예: rno)
            regdate: response.data.regdate || new Date().toISOString(), // 서버 응답 데이터에 따라 조정
            likedByUser: [],
          },
        ]);
        setComment(''); // 입력창 초기화
        setInputCount(0); // 입력 길이 초기화
      }
    } catch (error) {
      console.error('댓글 작성 실패', error);
    }
  };

  useEffect(() => {
    axios
      .get(`/reply/list/${rowData.no}`)
      .then((response) => {
        if (response.status === 200) {
          // 서버 응답 데이터를 상태에 설정
          setCommentsData(
            response.data.map((comment) => ({
              ...comment,
              likedByUser: comment.likedByUser || [], // 좋아요한 유저 목록 초기화
            })),
          );
        }
      })
      .catch((error) => {
        console.error('댓글 데이터 요청 실패:', error);
      });
  }, [rowData.no]);
  const handleDeletecommentClick = async (rno) => {
    if (!user) {
      setIsDialogOpen(true);
      return;
    }
    try {
      const comment = commentsData.find((comment) => comment.rno === rno);
      if (comment && comment.userId === user.userId) {
        await axios.delete(`/reply/delete/${rno}/${user.userId}`);
        setCommentsData((prev) =>
          prev.filter((comment) => comment.rno !== rno),
        );
      } else {
        alert('댓글 작성자만 삭제할 수 있습니다.');
      }
    } catch (error) {
      console.error('댓글 삭제에 실패했습니다.', error);
    }
  };
  const handleEditChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleSaveEdit = async (rno) => {
    if (!user || !user.userId) {
      setIsDialogOpen(true);
      return;
    }
    try {
      // 서버에 댓글 수정 요청
      const updatedComment = {
        r_content: editedContent, // 수정된 댓글 내용
        userId: user.userId, // 사용자 ID
      };

      const response = await axios.put(`/reply/edit/${rno}`, updatedComment);

      // 댓글 수정이 성공하면, 클라이언트 상태 업데이트
      if (response.status === 200) {
        setCommentsData((prev) => {
          const updatedComments = prev.map((comment) =>
            comment.rno === rno
              ? { ...comment, r_content: editedContent }
              : comment,
          );
          console.log('수정된 댓글 데이터:', updatedComments); // 수정된 데이터 확인
          return updatedComments;
        });
        setEditingComment(null);
      }
    } catch (error) {
      console.error('댓글 수정 실패', error);
    }
  };

  const handleNavigateToCommunity = () => {
    navigate('/community');
  };
  const handleNavigateToEditForm = () => {
    navigate('/editFormBox', { state: { rowData } });
  };

  const toggleLike = async (rno) => {
    if (!isLoggedIn || !user) {
      setIsDialogOpen(true);
      return;
    }

    try {
      const commentToUpdate = commentsData.find(
        (comment) => comment.rno === rno,
      );

      if (!commentToUpdate) return;

      // 이미 좋아요를 눌렀다면 취소
      if (commentToUpdate.likedByUser.includes(user.userId)) {
        const updatedComments = commentsData.map((comment) =>
          comment.rno === rno
            ? {
                ...comment,
                like_count: comment.like_count - 1,
                likedByUser: comment.likedByUser.filter(
                  (userId) => userId !== user.userId,
                ),
              }
            : comment,
        );
        setCommentsData(updatedComments);
      } else {
        // 좋아요를 누르지 않았다면
        const updatedComments = commentsData.map((comment) =>
          comment.rno === rno
            ? {
                ...comment,
                like_count: comment.like_count + 1,
                likedByUser: [...comment.likedByUser, user.userId],
              }
            : comment,
        );
        setCommentsData(updatedComments);
      }

      // 서버에도 좋아요 상태 업데이트 요청
      await axios.post('/reply/like', { rno, userId: user.userId });
    } catch (error) {
      console.error('좋아요 토글 실패', error);
    }
  };

  const onInputHandler = (e) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setInputCount(e.target.value.length);
  };

  const handleDeletePost = async () => {
    console.log('삭제 버튼 클릭됨');

    try {
      const postId = rowData.no;
      console.log(postId);

      if (user && rowData.userId === user.userId) {
        await axios.delete(`/posts/delete/${postId}`);
        navigate('/community');
      }
    } catch (error) {
      console.error('게시물 삭제에 실패했습니다.', error);
    }
  };
  const handleDialogLogin = () => {
    setIsDialogOpen(false);
    navigate('/login');
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Root>
      <h2>{rowData.title}</h2>
      <CommonHr
        width="918px"
        borderWidth="2px"
        borderColor="black"
        margin="10px auto 20px"
      />
      <div style={{ textAlign: 'right' }}>
        {rowData.userId} | {rowData.regdate} | 조회수: {rowData.viewcnt}
      </div>{' '}
      <div style={{ width: '100%' }}>{rowData.content}</div>
      {rowData?.imgurl && (
        <div style={{ width: '100%' }}>
          <img
            src={`${process.env.REACT_APP_API_URL}${rowData.imgurl}`}
            alt="Post"
          />
        </div>
      )}
      <Listbox>
        <textarea
          maxLength={MAX_LENGTH}
          onChange={(e) => {
            setComment(e.target.value);
            onInputHandler(e);
          }}
          width="900px"
          height="120px"
          placeholder={
            isLoggedIn
              ? '댓글을 작성해 보세요'
              : '로그인 시 댓글 작성이 가능합니다'
          }
          value={comment}
        />

        <Replybox>
          <p>
            <span>{inputCount.toLocaleString()}</span>
            <span>/{MAX_LENGTH.toLocaleString()}자</span>
          </p>
          <CommonButton
            color="white"
            text="등록"
            {...commonButtonProps}
            isDisabled={comment.trim().length === 0 || !isLoggedIn}
            onClick={handleSubmit}
          />
        </Replybox>
      </Listbox>
      <CommentBox>
        {commentsData.map((comment) => (
          <div key={comment.rno}>
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
                    <HeartButton
                      like={user && comment.likedByUser.includes(user.userId)}
                      onClick={user ? () => toggleLike(comment.rno) : null}
                    />
                    <p>{comment.like_count}</p>
                  </LikeBox>
                </>
              )}
            </BottomRow>
          </div>
        ))}
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
        <CommonButton
          text="삭제"
          font-size="20px"
          onClick={handleDeletePost}
          {...commonButtonProps}
        />
      </BottomBox>
      <CommonDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        children={'로그인 해주세요'}
        onClick={handleDialogLogin}
      />
    </Root>
  );
}
export default CommunityPost;
