import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
// import { ReactComponent as Profile } from '../../assets/images/Profile.svg';
import CommonButton from '../../common/CommonButton';
import CommonHr from '../../common/CommonHr';
import CommonInput from '../../common/CommonInput';
import CommunityComment from './CommunityComment';

// const comments = [
//   {
//     name: '한교동',
//     time: '1시간전',
//     comment: '안녕하세요. 반갑습니다~!',
//   },
//   {
//     name: '포차코',
//     time: '30분전',
//     comment: '안녕하세요. 반갑습니다~!',
//   },
//   {
//     name: '핀테크',
//     time: '2시간전',
//     comment: '안뇽하세욧ㅇㅇ용',
//   },
// ];
const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  height: 100%;
`;

const Box = styled.div`
  display: flex;
  // justify-content: flex-end;
  align-items: flex-start;
  height: 300px;
  // border: 1px solid gray;
  margin-top: 10px;
`;
const Detailbox = styled.div`
  display: flex;
  // justify-content: flex-end;
  // align-items: flex-end;
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
// const CommentBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;

//   & > div {
//     flex-direction: column;
//     gap: 5px;
//   }
// `;
// const TopRow = styled.div`
//   margin-top: 5px;
//   display: flex;
//   align-items: center;
//   gap: 5px;
//   height: 50px;
// `;
// const ImageBox = styled.div`
//   & > svg {
//     width: 50px;
//     height: 50px;
//     border: 1px solid rgba(128, 128, 128, 0.3);
//     border-radius: 50px;
//     // margin:10px;
//   }
// `;

// const TimeText = styled.span`
//   color: ${(props) => props.theme.color.lightGray};
//   font-size: 12px;
//   margin-left: 8px;
//   margin: auto 55px;
// `;
// const TextBox = styled.div`
//   & > p {
//     color: ${(props) => props.theme.color.black};
//     margin: 0px auto 20px 55px;
//   }
// `;
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
  const [communityData, setCommunityData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // 게시글 데이터를 불러오는 함수
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`/community123/${id}`);
        setCommunityData(response.data); // 게시글 데이터
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [id]); // id가 변경될 때마다 데이터 새로 불러오기

  const handleNavigateToCommunity = () => {
    navigate('/community');
  };

  const handleNavigateToEditForm = () => {
    navigate(`/editFormBox/${id}`);
  };

  if (!communityData) {
    return <div>Loading...</div>; // 게시글 데이터가 아직 로드되지 않은 경우
  }

  return (
    <Root>
      <button
        style={{
          fontSize: '15px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
        onClick={handleNavigateToCommunity}
      >
        &lt; 이전
      </button>
      <p style={{ fontWeight: 'bold', fontSize: '18px' }}>
        커뮤니티{' '}
        <span style={{ color: '#4064e6' }}>{communityData.communityNo}</span>
      </p>
      <CommonHr
        width="1200px"
        borderWidth="1.5px"
        borderColor="rgba(128, 128, 128, 0.7)"
        margin="10px auto 20px"
      />
      <p
        style={{ fontWeight: 'bold', fontSize: '20px', margin: '0px 0px 10px' }}
      >
        {communityData.commTitle}
      </p>
      <Detailbox>
        <label style={{ fontSize: '12px' }}>
          {/* 등록일 {communityData.createdAt} | 작성자 {communityData.userId} |
          조회수 {communityData.viewCount} */}
          등록일 2025-01-14 | 작성자 {communityData.userId} | 조회수 0
        </label>
      </Detailbox>

      <CommonHr
        width="1200px"
        borderWidth="1.5px"
        borderColor="rgba(128, 128, 128, 0.3)"
        margin="20px auto 20px"
      />

      <Box>
        <p>{communityData.commCont}</p>
      </Box>

      <CommunityComment />
      {/* <CommentBox>
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
                    // margin="auto"
                  />
                )}
              </TextBox>
            </div>
          );
        })}
      </CommentBox> */}

      <Listbox>
        <CommonInput
          width="1107px"
          height="50px"
          placeholder={`(작성자: ${communityData.userId}) 댓글을 입력해주세요.`}
        />
        <CommonButton
          background-color="#3563E9"
          color="white"
          text="등록"
          {...commonButtonProps}
        />
      </Listbox>

      <BottomBox>
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
