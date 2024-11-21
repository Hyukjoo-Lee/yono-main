import React from 'react';
import CommonSelect from '../../../common/CommonSelect';
import styled from 'styled-components';
import CustomButton from '../../../common/CommonButton';
import CommonInput from '../../../common/CommonInput';
import CommonRoot from '../../../common/CommonRoot';

const Rootin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
`;
const FullContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 36px;
  font-family: Noto Sans;
  color: #4064e6;
  font-weight: bold;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: flex-end;
  justify-content: space-between;
  width: 45%;
`;
const FindForm = ({ find }) => {
  const selectOptions = [
    { value: '애완동물 이름은?', label: '애완동물 이름은?' },
    { value: '당신의 생일은?', label: '당신의 생일은' },
    { value: '당신이 좋아하는 음식은?', label: '당신이 좋아하는 음식은?' },
  ];

  return (
    <CommonRoot>
      <Rootin>
        <FullContainer>
          <Title>{find}</Title>

          <MiddleContainer>
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

            <CommonInput
              text="답변"
              color="#464646"
              width="300px"
              height="35px"
              focusBorderWidth="10px"
              focusBorderColor="#4064E6"
            />
          </MiddleContainer>

          <ButtonContainer>
            <CustomButton
              text="확인"
              width="50px"
              height="30px"
              background="#4064E6"
              color="#ffffff"
              // borderColor="#4064E6"
              fontSize="20"
            />
            <CustomButton
              text="취소"
              width="50px"
              height="30px"
              background="#ffffff"
              color="#4064E6"
              // borderColor="1px"
              fontSize="20"
            />
          </ButtonContainer>
        </FullContainer>
      </Rootin>
    </CommonRoot>
  );
};
export default FindForm;
