import styled from 'styled-components';
import CommonInput from '../../common/CommonInput';
import CommonSelect from '../../common/CommonSelect';
import CommonButton from '../../common/CommonButton';
import { useState } from 'react';
import CommonPageInfo from '../../common/CommonPageInfo';
import HorizonLine from './HorizontalLine';

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
  max-width: 800px;
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
  }

  & textarea:focus {
    border: 1px solid #1976d2;
    outline: none;
  }
`;

const Row1 = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const Box1 = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
  gap: 30px;
`;

export function CommunityFormBox() {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreeChange = (e) => {
    setIsAgreed(e.target.checked);
    if (e.target.checked) {
    }
  };

  return (
    <Root>
      <CommonPageInfo title={'고객게시판'} text={<p></p>} />
      <HorizonLine />
      <FormBox>
        <Row>
          <span>제목</span>
          <CommonInput
            width="500px"
            height="40px"
            placeholder="제목을 입력해주세요"
          />
        </Row>
        <Row>
          <span> 카테고리</span>
          <CommonSelect
            options={[
              { value: 'option_1', label: '정보공유' },
              { value: 'option_2', label: '질문' },
              { value: 'option_3', label: '기타 문의' },
            ]}
            width="500px"
            height="40px"
            text="문의를 선택해주세요"
            display="none"
          />
        </Row>

        <Row>
          <span>내용</span>
          <textarea cols="59" rows="15"></textarea>
        </Row>
        <Row>
          <span>파일</span>
          <CommonInput width="390px" height="40px" placeholder="파일 첨부" />
          <CommonButton
            text="파일찾기"
            width="100px"
            height="40px"
            font-size="10px"
          />
        </Row>
      </FormBox>
      <HorizonLine />
      <Row1>
        <label>
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={handleAgreeChange}
          />
          이용약관에 동의합니다.
        </label>
      </Row1>
      <Box1>
        <CommonButton
          text="문의하기"
          width="200px"
          height="50px"
          font-size="20px"
        />
      </Box1>
    </Root>
  );
}
export default CommunityFormBox;
