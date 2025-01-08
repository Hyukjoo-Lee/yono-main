import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CommonButton from '../../common/CommonButton';
import CommonHr from '../../common/CommonHr';
import CommonInput from '../../common/CommonInput';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonSelect from '../../common/CommonSelect';

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
const OptionList = [
  { value: 'option_1', label: '정보공유' },
  { value: 'option_2', label: '질문' },
  { value: 'option_3', label: '기타 문의' },
];

export function CommunityFormBox() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [categoryOption, setCategoryOption] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);

  const handleButtonClick = async () => {
    try {
      const requestData = {
        commTitle: title,
        commCategory: categoryOption,
        commCont: content,
        commImgUrl: image,
      };

      const response = await axios.post(
        '/community/communityFormBox',
        requestData,
      );

      if (response.status === 200) {
        alert('게시글이 등록되었습니다.');
        navigate('/community');
      }
    } catch (error) {
      //오류처리
      alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
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
            value={title}
            onChange={handleTitleChange}
          />
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
            setSelectedValue={(value) => setCategoryOption(value)}
          />
        </Row>

        <Row>
          <span>내용</span>
          <textarea value={content} onChange={handleContentChange}></textarea>
        </Row>
        <Row>
          <span>사진</span>
          <CommonInput width="390px" height="40px" placeholder="사진 첨부" />
          <CommonButton
            text="사진 찾기"
            width="100px"
            height="40px"
            font-size="10px"
            value={image}
            onChange={handleImageChange}
          />
        </Row>
      </FormBox>
      <CommonHr
        width="918px"
        borderWidth="2px"
        borderColor="black"
        margin="10px auto 20px"
      />
      <Box1>
        <CommonButton
          text="등록하기"
          width="200px"
          height="50px"
          font-size="20px"
          onClick={handleButtonClick}
        />
      </Box1>
    </Root>
  );
}
export default CommunityFormBox;
