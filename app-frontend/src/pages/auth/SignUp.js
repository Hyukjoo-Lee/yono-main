import CommonRoot from '../../common/CommonRoot';
import styled from 'styled-components';
import CommonInput from '../../common/CommonInput';
import CommonButton from '../../common/CommonButton';
import CommonSelect from '../../common/CommonSelect';
import CommonHr from '../../common/CommonHr';

const FullContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  font-size: 36px;
  color: #4064e6;
  font-weight: bold;
  margin-bottom: -20px;
`;

const MiddleContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const MiddleTitle = styled.div`
  font-size: 16px;
  color: #757575;
`;
const IDContainer = styled.div`
  display: flex;
  flex-direction: flex-end;
  justify-content: space-between;
  align-items: flex-end;
  width: 103%;
`;

const ImgContainer = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid #d7d7d7;
`;

export function SignUp() {
  const selectOptions = [
    { value: '애완동물 이름은?', label: '애완동물 이름은?' },
    { value: '당신의 생일은?', label: '당신의 생일은' },
    { value: '당신이 좋아하는 음식은?', label: '당신이 좋아하는 음식은?' },
  ];
  return (
    <CommonRoot>
      <FullContainer>
        <Title>회원가입</Title>
        <MiddleContainer>
          <MiddleTitle>회원정보입력</MiddleTitle>
          <CommonHr />
          <IDContainer>
            <CommonInput
              placeholder="아이디를 입력하세요"
              text="아이디"
              background="#F5F5F5"
              width="310px"
            />
            <CommonButton
              width="73px"
              height="37px"
              background="#F5F5F5"
              text="중복확인"
              color="#757575"
            />
          </IDContainer>
          <CommonHr />
          <CommonInput
            placeholder="비밀번호를 입력하세요"
            text="비밀번호"
            background="#F5F5F5"
            width="310px"
          />
          <CommonHr />
          <CommonInput
            placeholder="비밀번호 확인해주세요"
            text="비밀번호 확인"
            background="#F5F5F5"
            width="310px"
          />
          <CommonHr />
          <CommonInput
            placeholder="닉네임을 적어주세요"
            text="닉네임"
            background="#F5F5F5"
            width="310px"
          />
          <CommonHr />

          <CommonSelect
            text="질문선택"
            height="35px"
            width="300px"
            padding="10px"
            color="#464646"
            labelColor="#464646"
            options={selectOptions}
            find="질문을 선택하세요"
          />
          <CommonHr />
          <CommonInput
            placeholder="답변을 적어주세요"
            text="답변"
            background="#F5F5F5"
            width="310px"
          />
          <CommonHr />
          <ImgContainer></ImgContainer>
        </MiddleContainer>
      </FullContainer>
    </CommonRoot>
  );
}
