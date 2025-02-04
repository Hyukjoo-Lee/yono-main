// import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createNotice } from '../../apis/noticeApi';
import CommonButton from '../../common/CommonButton';
import CommonHr from '../../common/CommonHr';
import CommonInput from '../../common/CommonInput';

const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0px;
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const Row = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
  & > span {
    width: 30px;
    margin-right: 20px;
    white-space: nowrap;
    display: flex;
  }

  & > textarea {
    background-color: #f8f9fe;
    border-radius: 5px;
    border: 1px solid #d7d7d7;
    resize: none;
    font-size: 16px;
    width: 1120px;
    height: 390px;
    box-sizing: border-box;
  }

  & textarea:focus {
    border: 1px solid #1976d2;
    outline: none;
  }

  & > button {
    margin-top: 5px;
  }
`;

const FormTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.xl};
  color: ${(props) => props.theme.color.black};
  font-weight: bold;
  // margin: 20px 0px 0;
`;

const HiddenInput = styled.input`
  display: none;
`;

export function NoticeFormBox() {
  const navigate = useNavigate();
  // const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const user = useSelector((state) => state.user.user);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => setContent(e.target.value);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!title?.trim() || title.length > 50) {
      errors.title = '제목을 1자 이상 50자 이내로 입력해주세요.';
    }

    if (!content?.trim() || content.length > 2000) {
      errors.content = '내용을 1자 이상 2000자 이내로 입력해주세요.';
    }
    return errors;
  };

  const handleButtonClick = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      alert(Object.values(validationErrors).join('\n'));
      return;
    }

    const formData = new FormData();
    formData.append('userId', user.userId);
    formData.append('title', title);
    formData.append('content', content);

    if (image) formData.append('file', image);

    const { success, message } = await createNotice(formData);

    if (success) {
      alert('게시글이 등록되었습니다.');
      navigate('/community');
    } else {
      alert(`오류 : ${message}`);
    }
  };

  return (
    <Root>
      <Wrapper>
        <FormTitle>공지사항 글쓰기</FormTitle>
        <CommonButton
          text="등록하기"
          width="200px"
          height="50px"
          font-size="20px"
          onClick={handleButtonClick}
        />
      </Wrapper>
      <CommonHr
        width="1200px"
        borderWidth="2px"
        borderColor="black"
        margin="10px auto 20px"
      />
      <FormBox>
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>제목</span>
          <CommonInput
            width="500px"
            height="40px"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={handleTitleChange}
          />
          <span>사진</span>
          <CommonInput
            width="390px"
            height="40px"
            placeholder="사진 첨부"
            readOnly={true}
            value={image ? image.name : ''}
          />
          <HiddenInput type="file" onChange={handleImageChange} />
          <CommonButton
            text="사진 찾기"
            width="120px"
            height="40px"
            font-size="10px"
            onClick={() => document.querySelector('input[type="file"]').click()}
          />
        </Row>
        <Row></Row>

        <Row>
          <span>내용</span>
          <textarea value={content} onChange={handleContentChange} />
        </Row>
      </FormBox>
    </Root>
  );
}
export default NoticeFormBox;
