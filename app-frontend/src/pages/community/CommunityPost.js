import styled from 'styled-components';
import CommonButton from '../../common/CommonButton';
import CommonDialog from '../../common/CommonDialog';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonHr from '../../common/CommonHr';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CommunityComment from './CommunityComment ';

const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  min-height: 100vh;
`;
const MoveButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const MoveButton = styled.button`
  font-size: ${(props) => props.theme.fontSize.sm};
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bold;
`;
const CommunityTitle = styled.p`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSize.md};
  margin: 0px 0px 10px;
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

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 300px;
  margin-top: 10px;
  gap: 20px;

  p {
    margin: 0;
    margin-right: 10px;
    white-space: pre-line;
  }

  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
`;

const Detailbox = styled.div`
  display: flex;

  & label {
    font-size: ${(props) => props.theme.fontSize.xs};
  }
`;

const ImgBox = styled.div`
  height: 100%;
  width: 100%;
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
  const [commentsData, setCommentsData] = useState([]);
  const [inputCount, setInputCount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [editingComment, setEditingComment] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const MAX_LENGTH = 100;
  const navigate = useNavigate();

  const toggleOptions = (rno) => {
    setShowOptions((prev) => ({
      ...prev,
      [rno]: !prev[rno],
    }));
  };

  const handleSubmit = async () => {
    if (!isLoggedIn || !user) {
      // user가 null일 경우 체크
      setDialogMessage('로그인해주세요');
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
            ...replyData,
            rno: response.data.rno,
            regdate: response.data.regdate || new Date().toISOString(),
            likedByUser: [],
          },
        ]);
        setComment('');
        setInputCount(0);
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
    const commentToEdit = commentsData.find((comment) => comment.rno === rno);

    if (!commentToEdit || commentToEdit.userId !== user.userId) {
      alert('댓글 작성자만 수정할 수 있습니다.');
      return;
    }
    try {
      // 서버에 댓글 수정 요청
      const updatedComment = {
        r_content: editedContent,
        userId: user.userId,
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
    if (!user || rowData.userId !== user.userId) {
      setDialogMessage('작성자만 수정할 수 있습니다.');
      setIsDialogOpen(true);
      return;
    }
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

      const updatedComments = commentsData.map((comment) =>
        comment.rno === rno
          ? {
              ...comment,
              like_count: comment.likedByUser.includes(user.userId)
                ? Math.max(comment.like_count - 1, 0)
                : comment.like_count + 1,
            }
          : comment,
      );
      setCommentsData(updatedComments);

      const response = await axios.post(`/reply/like/${rno}`, {
        rno,
        userId: user.userId,
      });

      // 서버 응답 처리 (likeCount와 isLiked)
      if (response.data.likeCount !== undefined) {
        const updatedCommentsWithServerData = commentsData.map((comment) =>
          comment.rno === rno
            ? {
                ...comment,
                like_count: Math.max(response.data.likeCount, 0),
              }
            : comment,
        );
        setCommentsData(updatedCommentsWithServerData);
        console.log('좋아요 토글 성공:', response.data);
      }
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
    if (!user || rowData.userId !== user.userId) {
      setDialogMessage('작성자만 삭제할 수 있습니다.');
      setIsDialogOpen(true);
      return;
    }
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
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Root>
      <MoveButtonWrap>
        <MoveButton onClick={handleNavigateToCommunity}>&lt; 목록</MoveButton>
      </MoveButtonWrap>
      <CommunityTitle>{rowData.title}</CommunityTitle>
      <CommonHr
        width="1200px"
        borderWidth="1.5px"
        borderColor="rgba(128, 128, 128, 0.7)"
        margin="10px auto 20px"
      />
      <Detailbox>
        <label>
          등록일 :{rowData.regdate} | 작성자 {rowData.userId} | 조회수:
          {rowData.viewcnt}
        </label>
      </Detailbox>
      <CommonHr
        width="1200px"
        borderWidth="1.5px"
        borderColor="rgba(128, 128, 128, 0.3)"
        margin="20px auto 20px"
      />{' '}
      <Box>
        <p>{rowData.content}</p>
        <ImgBox>
          {rowData.imgurl && (
            <img
              src={`${process.env.REACT_APP_API_URL}${rowData.imgurl}`}
              alt="Post"
            />
          )}
        </ImgBox>
      </Box>
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
      <CommunityComment
        commentsData={commentsData}
        toggleOptions={toggleOptions}
        showOptions={showOptions}
        handleDeletecommentClick={handleDeletecommentClick}
        setEditingComment={setEditingComment}
        setEditedContent={setEditedContent}
        editingComment={editingComment}
        editedContent={editedContent}
        handleEditChange={handleEditChange}
        handleSaveEdit={handleSaveEdit}
        user={user}
        toggleLike={toggleLike}
      />
      <BottomBox>
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
        children={dialogMessage}
        onClick={user ? handleDialogClose : handleDialogLogin}
      />
    </Root>
  );
}
export default CommunityPost;
