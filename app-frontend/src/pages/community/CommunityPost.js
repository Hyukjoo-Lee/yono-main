import styled from 'styled-components';
import CommonButton from '../../common/CommonButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Profile } from '../../assets/images/Profile.svg';
import CommonHr from '../../common/CommonHr';
import HeartImg from '../../assets/images/HeartImg.png';
import EmptyHeartImg from '../../assets/images/EmptyHeartImg.png';
import ListIcon from '../../assets/images/ListIcon.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Root = styled.div`
  width: ${(props) => props.theme.display.sm};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  height: 100%;
`;

const list_data = [
  {
    Option1: '삭제',
    Option2: '수정',
  },
];
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
    margin: 0;
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

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TextBox = styled.div`
  & > p {
    color: ${(props) => props.theme.color.black};
    margin-left: 25px;
  }
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
  const [commentsData, setCommentsData] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    if (newComment.trim() === '') {
      return;
    }
    try {
      const response = await axios.post(`/reply/write`, {
        pno: rowData.userId,
        userId: user.userId,
        r_content: newComment,
      });
      setCommentsData((prev) => [...prev, response.data]);
      setNewComment('');
    } catch (error) {
      console.log('댓글 등록 실패', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/comments/${rowData.userId}`);
      setCommentsData(response.data); // 댓글 목록 갱신
    } catch (error) {
      console.error('댓글 목록을 가져오는데 실패했습니다.', error);
    }
  };

  const handleOptionClick = (option) => {
    console.log(`${option} 클릭됨`);
    setShowOptions(false);
  };
  const handleNavigateToCommunity = () => {
    navigate('/community');
  };
  const handleNavigateToEditForm = () => {
    navigate('/editFormBox', { state: { rowData } });
  };
  const [like, setLike] = useState(false);
  const [count, setCount] = useState(0);
  const [inputCount, setInputCount] = useState(0);
  const user = useSelector((state) => state.user.user);
  const MAX_LENGTH = 100;

  const toggleLike = () => {
    setLike((prev) => {
      const newLiked = !prev;
      setCount((prevCount) => {
        if (newLiked && prevCount === 0) {
          return prevCount + 1;
        } else if (!newLiked && prevCount > 0) {
          return prevCount - 1;
        }
        return prevCount;
      });
      return newLiked;
    });
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
      <Listbox>
        <textarea
          maxLength={MAX_LENGTH}
          onChange={onInputHandler}
          width="900px"
          height="120px"
          placeholder="댓글을 입력해주세요."
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
            onClick={handleSubmit}
          />
        </Replybox>
      </Listbox>
      <CommentBox>
        {commentsData.map((comment, index) => {
          return (
            <div key={index}>
              <TopRow>
                <ImageBox>
                  <Profile />
                </ImageBox>
                <h3>
                  {comment.userId} <TimeText>{comment.createdAt}</TimeText>
                </h3>
                <ListIconBox onClick={toggleOptions}>
                  <ListIconImage src={ListIcon} alt="옵션 아이콘" />
                  {showOptions && (
                    <OptionsBox>
                      <ul>
                        {list_data.map((data, i) => (
                          <li
                            key={i}
                            onClick={() => handleOptionClick(data.Option1)}
                          >
                            {data.Option1}
                          </li>
                        ))}

                        {list_data.map((data, i) => (
                          <li
                            key={i}
                            onClick={() => handleOptionClick(data.Option2)}
                          >
                            {data.Option2}
                          </li>
                        ))}
                      </ul>
                    </OptionsBox>
                  )}
                </ListIconBox>
              </TopRow>
              <BottomRow>
                <TextBox>
                  <p>{comment.comment}</p>
                </TextBox>

                <LikeBox>
                  <HeartButton like={like} onClick={toggleLike} />
                  <p>{count}</p>
                </LikeBox>
              </BottomRow>
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
        <CommonButton
          text="삭제"
          font-size="20px"
          onClick={handleDeletePost}
          {...commonButtonProps}
        />
      </BottomBox>
    </Root>
  );
}
export default CommunityPost;
