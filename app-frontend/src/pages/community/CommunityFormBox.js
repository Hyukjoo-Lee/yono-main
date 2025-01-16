import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CommonButton from '../../common/CommonButton';
import CommonHr from '../../common/CommonHr';
import CommonInput from '../../common/CommonInput';
import CommonSelect from '../../common/CommonSelect';
import ReactQuillEdit from './ReactQuillEdit';

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
  // align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Row = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  & > span {
    width: 60px;
    // margin-right: 30px;
    // margin-left: 50px;
    // white-space: nowrap;
    // display: flex;
  }

  & > textarea {
    background-color: #f8f9fe;
    border-radius: 5px;
    border: 1px solid #d7d7d7;
    resize: none;
    font-size: 16px;
    width: 500px;
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

// const Box1 = styled.div`
//   display: flex;
//   justify-content: center;
//   margin: 30px;
//   // gap: 30px;
// `;

const FormTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.xl};
  color: ${(props) => props.theme.color.black};
  font-weight: bold;
  // margin: 20px 0px 0;
`;

// const HiddenInput = styled.input`
//   display: none;
// `;
const OptionList = [
  { value: 'option_1', label: '정보공유' },
  { value: 'option_2', label: '질문' },
  { value: 'option_3', label: '기타문의' },
];

export function CommunityFormBox() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [categoryOption, setCategoryOption] = useState('');
  const [content, setContent] = useState('');
  // const [image, setImage] = useState('');
  const user = useSelector((state) => state.user.user);
  // const fileInputRef = useRef(null);

  const requestData = {
    userId: user.userId,
    commTitle: title,
    commCategory: categoryOption,
    commCont: content,
    // commImgUrl: image,
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  // const handleContentChange = (e) => setContent(e.target.value);

  const handleContentChange = (value) => {
    setContent(value);
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file.name);
  //     // setImage(file); 파일 이름만 저장하려면 file.name를 써야함
  //   }
  // };

  const validateForm = () => {
    const errors = {};

    if (!title?.trim() || title.length > 50) {
      errors.title = '제목을 1자 이상 50자 이내로 입력해주세요.';
    }

    if (!categoryOption) {
      errors.categoryOption = '옵션을 선택해주세요.';
    }

    if (!content?.trim() || content.length > 2000) {
      errors.content = '내용을 1자 이상 2000자 이내로 입력해주세요.';
    }
    return errors;
  };

  const handleButtonClick = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      alert(Object.values(validationErrors)[0]);
      return;
    }

    try {
      console.log('request: ' + JSON.stringify(requestData));

      const response = await axios.post(
        '/community/communityFormBox',
        requestData,
      );

      if (response.status === 200) {
        alert('게시글이 등록되었습니다.');
        navigate('/communityList');
      }
    } catch (error) {
      alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Root>
      <Wrapper>
        <FormTitle>커뮤니티 글쓰기</FormTitle>
        <CommonButton
          text="등록하기"
          width="100px"
          height="40px"
          font-size="20px"
          onClick={handleButtonClick}
        />
      </Wrapper>
      <CommonHr width="1200px" borderWidth="2px" margin="10px auto 20px" />
      <FormBox>
        <Row>
          <span>제목</span>
          <CommonInput
            width="700px"
            height="40px"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={handleTitleChange}
          />

          <span> 카테고리</span>
          <CommonSelect
            options={OptionList}
            width="300px"
            height="40px"
            find="카테고리를 선택해 주세요"
            display="none"
            selectedValue={categoryOption}
            setSelectedValue={(value) => setCategoryOption(value)}
          />
        </Row>

        <Row>
          {/* <span>내용</span>
          <textarea value={content} onChange={handleContentChange} /> */}
          <ReactQuillEdit value={content} onChange={handleContentChange} />
        </Row>
        {/* <Row>
          <span>사진</span>
          <CommonInput
            width="390px"
            height="40px"
            placeholder="사진 첨부"
            readOnly={true}
            value={image}
          />
          <HiddenInput
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <CommonButton
            text="사진 찾기"
            width="100px"
            height="40px"
            font-size="10px"
            onClick={() => fileInputRef.current.click()}
          />
        </Row> */}
      </FormBox>
    </Root>
  );
}
export default CommunityFormBox;
