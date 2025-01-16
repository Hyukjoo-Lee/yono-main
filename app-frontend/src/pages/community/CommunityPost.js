import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommonButton from '../../common/CommonButton';
import CommonHr from '../../common/CommonHr';
import CommonInput from '../../common/CommonInput';
import CommunityComment from './CommunityComment';

const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  height: 100%;
`;

const MoveButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MoveButton = styled.button`
  font-size: ${(props) => props.theme.fontSize.sm};
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bold;
`;

const CommunityNum = styled.p`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSize.eighteen};
  & span {
    color: #4064e6;
  }
`;

const CommunityTitle = styled.p`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSize.md};
  margin: 0px 0px 10px;
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

  & label {
    font-size: ${(props) => props.theme.fontSize.xs};
  }
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
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`/community123/${id}`);
        setCommunityData(response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [id]);

  const handleNavigateToCommunity = () => {
    navigate('/community');
  };

  const handleNavigateToNext = () => {
    const nextId = parseInt(id, 10) + 1;
    navigate(`/community/${nextId}`);
  };

  const handleNavigateToEditForm = () => {
    navigate(`/editFormBox/${id}`);
  };

  if (!communityData) {
    return <div>Loading...</div>;
  }

  return (
    <Root>
      <MoveButtonWrap>
        <MoveButton onClick={handleNavigateToCommunity}>&lt; 목록</MoveButton>
        <MoveButton onClick={handleNavigateToNext}>다음 &gt;</MoveButton>
      </MoveButtonWrap>

      <CommunityNum>
        커뮤니티 <span>{communityData.communityNo}</span>
      </CommunityNum>

      <CommonHr
        width="1200px"
        borderWidth="1.5px"
        borderColor="rgba(128, 128, 128, 0.7)"
        margin="10px auto 20px"
      />

      <CommunityTitle>{communityData.commTitle}</CommunityTitle>

      <Detailbox>
        <label>
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
      <div style={{ marginBottom: '20px' }}>
        <CommunityComment />
      </div>
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
