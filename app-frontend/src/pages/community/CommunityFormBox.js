import styled from 'styled-components';
import CommonInput from '../../common/CommonInput';
import CommonSelect from '../../common/CommonSelect';
import CommonButton from '../../common/CommonButton';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonHr from '../../common/CommonHr';
import { useState } from 'react';
import axios from 'axios';

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
  justify-content: center;
  & > span {
    width: 60px;
    margin-right: 100px;
    white-space: nowrap;
    display: flex;
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
  { value: 'option_1', label: '정보공유' },
  { value: 'option_2', label: '질문' },
  { value: 'option_3', label: '기타 문의' },
];

export function CommunityFormBox() {
  const [categoryOption, setcategoryOption] = useState('');
  const [postFormData, setpostFormData] = useState({
    title: '',
    category: '',
    content: '',
    file: null,
  });

  const [alertMessage, setAlertMessage] = useState({
    title: '',
    category: '',
    content: '',
    file: '',
  });

  const validateForm = () => {
    const errors = {};

    if (!postFormData.title) {
      errors.title = '1자 이상 50자 이내로 입력해주세요';
    }
    if (!postFormData.category) {
      errors.category = '카테고리를 입력해주세요';
    }
    if (!postFormData.content) {
      errors.content = '10자 이상 2000자 이하로 입력 해주세요요';
    }
    return errors;
  };

  const FileUpload = () => {
    const [file, setFile] = useState('');

    //파일 크기 제한
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setAlertMessage({
        ...alertMessage,
        file: '파일 크기는 5MB 이하만 허용됩니다.',
      });
      return;
    }

    //파일 확장자 검사
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtendsion = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtendsion)) {
      setAlertMessage({
        ...alertMessage,
        file: '허용되지 않는 파일 형식입니다,',
      });
      return;
    }

    //파일 상태 저장
    setpostFormData({ ...postFormData, file: file });
    setAlertMessage({
      ...alertMessage,
      file: '',
    });
    console.log('파일 업로드 성공');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setAlertMessage(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    //서버로 데이터 전송
    try {
      const response = await axios.post('/community/create-post', postFormData);
      console.log('게시글 등록 성공: ', response.data);
    } catch (error) {
      console.log('게시글 등록 실패:', error);
    }
  };
  return (
    <Root>
      <CommonPageInfo title={'고객게시판'} text={<p></p>} />
      <CommonHr
        width="918px"
        borderWidth="2px"
        borderColor="black"
        margin="10px auto 20px"
      />
      <FormBox>
        <Row>
          <span>제목</span>
          <CommonInput
            width="500px"
            height="40px"
            placeholder="제목을 입력해주세요"
            value={postFormData.title}
            onChange={(e) =>
              setpostFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          {alertMessage.title && (
            <ErrorMessage>{alertMessage.title}</ErrorMessage>
          )}
        </Row>
        <Row>
          <span> 카테고리</span>
          <CommonSelect
            options={OptionList}
            width="500px"
            height="40px"
            find="카테고리를 선택해 주세요"
            display="none"
            selectedValue={categoryOption}
            setSelectedValue={(value) => setcategoryOption(value)}
            onChange={(e) =>
              setpostFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            value={postFormData.category}
          />
          {alertMessage.category && (
            <ErrorMessage>{alertMessage.category}</ErrorMessage>
          )}
        </Row>

        <Row>
          <span>내용</span>
          <textarea
            value={postFormData.content}
            onChange={(e) =>
              setpostFormData((prev) => ({ ...prev, content: e.target.value }))
            }
          />
          {alertMessage.content && (
            <ErrorMessage>{alertMessage.content}</ErrorMessage>
          )}
        </Row>
        <Row>
          <span>사진</span>
          <CommonInput
            width="390px"
            height="40px"
            placeholder="사진 첨부"
            accept=".jpg, jepg, .png, .gif"
          />
          <CommonButton
            text="사진 찾기"
            width="100px"
            height="40px"
            font-size="10px"
          />
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
          font-size="20px"
          onClick={handleSubmit}
        />
      </Box1>
    </Root>
  );
}
export default CommunityFormBox;
