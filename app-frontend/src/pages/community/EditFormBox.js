import styled from 'styled-components';
import CommonInput from '../../common/CommonInput';
import CommonSelect from '../../common/CommonSelect';
import CommonButton from '../../common/CommonButton';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonHr from '../../common/CommonHr';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  }

  & textarea:focus {
    border: 1px solid #1976d2;
    outline: none;
  }

  & > button {
    margin-top: 5px;
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
  width: 918px;
  display: flex;
  justify-content: flex-end;
  margin: 20px;
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
  { value: '문의', label: '문의' },
];

export function EditFormBox() {
  const location = useLocation();
  const navigate = useNavigate();
  const { rowData } = location.state;
  const user = useSelector((state) => state.user.user);
  console.log('userId:', user.userId);
  console.log(rowData);
  const [postFormData, setPostFormData] = useState({
    userId: user.userId,
    no: '',
    title: '',
    category: '',
    content: '',
    imgurl: '',
    regdate: '',
  });

  const [alertMessage, setAlertMessage] = useState({
    title: '',
    category: '',
    content: '',
    file: '',
  });

  // 제목, 카테고리, 내용 변경 시 처리 함수
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

  const handleNavigateToList = () => {
    navigate('/community');
  };

  // 유효성 검사
  const validateForm = () => {
    const errors = {};
    if (
      !postFormData.title ||
      postFormData.title.length < 1 ||
      postFormData.title.length > 50
    ) {
      errors.title = '1자 이상 50자 이내로 입력해주세요';
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
          file: '사진 크기는 5MB 이하만 허용됩니다.',
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
      setPostFormData((prev) => ({
        ...prev,
        imgurl: file.name,
      }));
    }
  };

  useEffect(() => {
    if (rowData) {
      //userId가 존재하지 않을 경우 수정 폼 초기화
      setPostFormData({
        userId: rowData.userId,
        no: rowData.no,
        title: rowData.title || '',
        category: rowData.category || '',
        content: rowData.content || '',
        file: rowData.file || '',
        regdate: rowData.regdate || '',
      });
    }
  }, [rowData]);

  const handleSave = async (e) => {
    e.preventDefault();

    // 유효성 검사
    const errors = validateForm();
    setAlertMessage(errors);

    if (Object.keys(errors).length > 0) {
      console.log('유효성 검사 실패:', errors); // 유효성 검사 결과 확인
      return;
    }

    try {
      const formData = new FormData();
      formData.append('userId', postFormData.userId);
      formData.append('no', postFormData.no);
      formData.append('title', postFormData.title);
      formData.append('category', postFormData.category);
      formData.append('content', postFormData.content);
      formData.append('regdate', postFormData.regdate);

      if (postFormData.file) {
        formData.append('file', postFormData.file);
      }

      console.log(postFormData);

      // FormData를 JSON으로 변환
      const postData = JSON.stringify({
        userId: postFormData.userId,
        no: postFormData.no,
        title: postFormData.title,
        category: postFormData.category,
        content: postFormData.content,
        imgurl: postFormData.imgurl,
      });

      formData.append('postFormData', postData);

      console.log(postData);

      const response = await axios.put(
        `/posts/update/${postFormData.no}`,
        formData,
      );

      if (response.status === 200) {
        console.log('게시물 수정 성공:', response.data);

        navigate('/community', { state: { updatePost: response.data } });
      } else {
        setAlertMessage((prev) => ({
          ...prev,
          file: '서버 오류가 발생했습니다. 다시 시도해주세요.',
        }));
      }
    } catch (error) {
      console.error('게시물 수정 실패:', error);
      setAlertMessage((prev) => ({
        ...prev,
        file: '서버 오류로 인해 게시물을 수정할 수 없습니다.',
      }));
    }
  };

  return (
    <Root>
      <CommonPageInfo title={'게시판 수정'} text={<p></p>} />
      <CommonHr />
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
          <CommonSelect
            options={OptionList}
            width="500px"
            height="40px"
            placeholder="카테고리를 선택해 주세요"
            display="none"
            selectedValue={postFormData.category}
            setSelectedValue={(value) =>
              handleInputChange({ target: { value } }, 'category')
            } // handleInputChange로 처리
            onChange={(e) => handleInputChange(e, 'category')}
          />
        </Row>

        <Row>
          <span>내용</span>
          <div>
            <textarea
              value={postFormData.content}
              onChange={(e) => handleInputChange(e, 'content')}
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
                value={postFormData.imgurl}
                readOnly
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
      <CommonHr />
      <Box1>
        <CommonButton
          text="저장"
          width="80px"
          height="50px"
          font-size="20px"
          onClick={handleSave}
        />
        <CommonButton
          text="목록"
          width="80px"
          height="50px"
          font-size="20px"
          onClick={handleNavigateToList}
        />
      </Box1>
    </Root>
  );
}

export default EditFormBox;
