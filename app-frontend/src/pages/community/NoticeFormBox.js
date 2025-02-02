import styled from 'styled-components';
import CommonInput from '../../common/CommonInput';
import CommonSelect from '../../common/CommonSelect';
import CommonButton from '../../common/CommonButton';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonHr from '../../common/CommonHr';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  gap: 20px;
`;

const Row = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  & > span {
    width: 60px;
    margin-right: 100px;
    white-space: nowrap;
    display: flex;
  }

  & textarea {
    background-color: #f8f9fe;
    border-radius: 5px;
    border: 1px solid #d7d7d7;
    resize: none;
    font-size: 16px;
    width: 500px;
    height: 390px;
    box-sizing: border-box;
    padding-left: 9px;
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

const FileUploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  & > button {
    margin-top: 5px;
  }
`;

const Box1 = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
  gap: 30px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
  margin-top: 5px;
`;

const OptionList = [
  { value: '정보공유', label: '정보공유' },
  { value: '질문', label: '질문' },
  { value: '문의', label: '기타 문의' },
];

export function NoticeFormBox() {
  const [categoryOption, setCategoryOption] = useState('');
  const [postImg, setPostImg] = useState(null); //이미지 파일 자체의 상태
  const user = useSelector((state) => state.user.user);
  const [postFormData, setPostFormData] = useState({
    userId: user.userId,
    title: '',
    category: '',
    content: '',
    file: '',
  });

  const [alertMessage, setAlertMessage] = useState({
    title: '',
    category: '',
    content: '',
    file: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setPostFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setAlertMessage((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const handleSelectChange = (value) => {
    setCategoryOption(value);
    setPostFormData((prev) => ({
      ...prev,
      category: value,
    }));
    setAlertMessage((prev) => ({
      ...prev,
      category: '',
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (
      !postFormData.title ||
      postFormData.title.length < 1 ||
      postFormData.title.length > 50
    ) {
      errors.title = '1자 이상 50자 이내로 입력해주세요';
    }
    if (!postFormData.category) {
      errors.category = '카테고리를 선택해주세요';
    }
    if (
      !postFormData.content ||
      postFormData.content.length < 10 ||
      postFormData.content.length > 2000
    ) {
      errors.content = '10자 이상 2000자 이하로 입력해주세요';
    }
    return errors;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setAlertMessage((prev) => ({
          ...prev,
          file: '사진진 크기는 5MB 이하만 허용됩니다.',
        }));
        return;
      }
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        setAlertMessage((prev) => ({
          ...prev,
          file: '허용되지 않는 파일 형식입니다.',
        }));
        return;
      }

      setPostImg(file); // 파일을 설정합니다.
      setPostFormData((prev) => ({
        ...prev,
        file: file.name, // 파일명을 표시하도록 설정
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setAlertMessage(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const formData = new FormData();

    // 각 필드를 개별적으로 추가
    formData.append('postFormData', JSON.stringify(postFormData));

    // 파일이 선택된 경우에만 추가
    if (postImg) {
      formData.append('file', postImg);
    }

    // 폼 데이터 로그 확인
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const response = await axios.post('/posts/write', formData);

      console.log('게시글 등록 성공:', response.data);
      navigate('/community');
    } catch (error) {
      console.error(
        '게시글 등록 실패:',
        error.response ? error.response.data : error,
      );
    }
  };

  return (
    <Root>
      <CommonPageInfo title={'고객게시판'} text="" />
      <CommonHr
        width="918px"
        borderWidth="2px"
        borderColor="black"
        margin="10px auto 20px"
      />
      <FormBox>
        <Row>
          <span>제목</span>
          <div>
            <CommonInput
              width="500px"
              height="40px"
              placeholder="제목을 입력해주세요"
              value={postFormData.title}
              onChange={(e) => handleInputChange(e, 'title')}
            />
            {alertMessage.title && (
              <ErrorMessage>{alertMessage.title}</ErrorMessage>
            )}
          </div>
        </Row>
        <Row>
          <span>카테고리</span>
          <div>
            <CommonSelect
              options={OptionList}
              width="500px"
              height="40px"
              find="카테고리를 선택해 주세요"
              selectedValue={categoryOption}
              setSelectedValue={(value) => handleSelectChange(value)}
            />
            {alertMessage.category && (
              <ErrorMessage>{alertMessage.category}</ErrorMessage>
            )}
          </div>
        </Row>
        <Row>
          <span>내용</span>
          <div>
            <textarea
              value={postFormData.content}
              onChange={(e) => handleInputChange(e, 'content')}
              placeholder="내용을 입력해주세요"
            />
            {alertMessage.content && (
              <ErrorMessage>{alertMessage.content}</ErrorMessage>
            )}
          </div>
        </Row>

        <Row>
          <span>사진</span>
          <div>
            <FileUploadContainer>
              <CommonInput
                width="390px"
                height="40px"
                placeholder="사진 첨부"
                accept=".jpg, .jpeg, .png, .gif"
                value={postFormData.file}
                onChange={(e) => handleInputChange(e, 'fifle')}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <CommonButton
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
                text="사진 첨부"
                height="40px"
              />
            </FileUploadContainer>
            {alertMessage.file && (
              <ErrorMessage>{alertMessage.file}</ErrorMessage>
            )}
          </div>
        </Row>
      </FormBox>
      <CommonHr
        width="918px"
        borderWidth="2px"
        borderColor="black"
        margin="20px auto 20px"
      />
      <Box1>
        <CommonButton
          text="등록하기"
          width="200px"
          height="50px"
          fontSize="20px"
          onClick={handleSubmit}
        />
      </Box1>
    </Root>
  );
}

export default NoticeFormBox;
