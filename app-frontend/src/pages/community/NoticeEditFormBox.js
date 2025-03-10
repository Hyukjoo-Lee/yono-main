import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchNoticeDetail, updateNotice } from '../../apis/noticeApi';
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
`;

const HiddenInput = styled.input`
  display: none;
`;
export function NoticeEditFormBox() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({ title: false, content: false });
  const [notice, setNotice] = useState({ imgurl: '' });
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const data = await fetchNoticeDetail(id);
        if (data.success) {
          setNotice(data.data);
          setTitle(data.data.title || '');
          setContent(data.data.content || '');
          setFile(data.data.imgurl || null);
        } else {
          alert(data.message || '공지사항을 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.log('Error fetching notice:', error);
      }
    };
    fetchNotice();
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim() !== '') {
      setErrors((prev) => ({ ...prev, title: false }));
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (e.target.value.trim() !== '') {
      setErrors((prev) => ({ ...prev, content: false }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setNotice((prev) => ({
        ...prev,
        imgurl: selectedFile.name,
      }));
      setIsImageDeleted(false);
    }
    e.target.value = '';
  };

  const handleFileDelete = () => {
    setFile(null);
    setNotice((prev) => ({
      ...prev,
      imgurl: '',
    }));
    setIsImageDeleted(true);
  };

  const handleUpdate = async () => {
    const newErrors = {
      title: title.trim() === '',
      content: content.trim() === '',
    };

    setErrors(newErrors);

    if (newErrors.title || newErrors.content) {
      return;
    }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', title);
    formData.append('content', content);

    if (file) {
      formData.append('file', file);
    }

    if (isImageDeleted) {
      formData.append('imgurl', 'deleted');
    } else if (!file && notice.imgurl) {
      formData.append('imgurl', notice.imgurl);
    }

    const success = await updateNotice(formData);

    if (success) {
      alert('공지사항 수정 성공');
      navigate('/community');
    } else {
      alert('공지사항 수정에 실패했습니다.');
    }
  };

  return (
    <Root>
      <Wrapper>
        <FormTitle>공지사항 수정하기</FormTitle>
        <CommonButton
          text="수정하기"
          width="200px"
          height="50px"
          font-size="20px"
          onClick={handleUpdate}
        />
      </Wrapper>
      <CommonHr
        width="1200px"
        borderWidth="2px"
        borderColor="black"
        margin="10px auto 20px"
      />
      <FormBox>
        <Row>
          <span
            style={!errors.title ? { paddingBottom: 0 } : { paddingBottom: 25 }}
          >
            제목
          </span>
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
            readOnly
            value={
              file && file.name
                ? file.name
                : notice.imgurl
                  ? notice.imgurl.split('/').pop()
                  : ''
            }
          />
          <HiddenInput type="file" onChange={handleFileChange} />
          <CommonButton
            text="사진 찾기"
            width="120px"
            height="40px"
            font-size="10px"
            onClick={() => document.querySelector('input[type="file"]').click()}
          />
          {file && (
            <CommonButton
              text="삭제"
              width="120px"
              height="40px"
              font-size="10px"
              onClick={handleFileDelete}
            />
          )}
        </Row>

        <Row>
          <span>내용</span>
          <textarea value={content} onChange={handleContentChange} />
        </Row>
      </FormBox>
    </Root>
  );
}
