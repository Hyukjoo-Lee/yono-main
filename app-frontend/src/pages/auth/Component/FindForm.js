import CommonSelect from '../../../common/CommonSelect';
import styled from 'styled-components';
import CustomButton from '../../../common/CommonButton';
import CommonInput from '../../../common/CommonInput';
import CommonRoot from '../../../common/CommonRoot';
import CommonPageInfo from '../../../common/CommonPageInfo';
import { useNavigate } from 'react-router-dom';
import CommonHr from '../../../common/CommonHr';

const RootIn = styled.div`
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

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HiddenBox = styled.div`
  display: flex;
  margin-left: 58%;
  margin-bottom: 2%;
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: flex-end;
  justify-content: space-between;
  width: 45%;
`;
const styleProps = {
  height: '35px',
  width: '300px',
  background: 'transparent',
  $marginLeft: '7px',
};
const ContainerProps = {
  marginBottom: '3px',
};
const FindForm = ({
  find,
  answer,
  selectedValue,
  setSelectedValue,
  errorMessage,
  onClick,
  onChange,
}) => {
  const selectOptions = [
    { value: '애완동물 이름은?', label: '애완동물 이름은?' },
    { value: '당신의 생일은?', label: '당신의 생일은?' },
    { value: '당신이 좋아하는 음식은?', label: '당신이 좋아하는 음식은?' },
  ];
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <CommonRoot>
      <RootIn>
        <FullContainer>
          <CommonPageInfo title={find} text={<p></p>} />

          <MiddleContainer>
            <CommonSelect
              text="질문선택"
              find="질문을 선택하세요"
              padding="10px"
              color="#464646"
              labelColor="#464646"
              $fieldBorderColor="transparent"
              {...styleProps}
              value={answer}
              options={selectOptions}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
            <div style={ContainerProps} />

            <CommonHr />
            <div style={ContainerProps} />

            <CommonInput
              text="답변"
              color="#464646"
              placeholder="답변을 입력하세요"
              focusBorderWidth="10px"
              $borderColor="transparent"
              $focusBorderColor="transparent"
              {...styleProps}
              onChange={onChange}
            />
            <CommonHr />
          </MiddleContainer>
          <HiddenBox>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </HiddenBox>

          <ButtonContainer>
            <CustomButton
              text="확인"
              width="50px"
              height="30px"
              background="#4064E6"
              color="#ffffff"
              fontSize="20"
              onClick={onClick}
            />
            <CustomButton
              text="취소"
              width="50px"
              height="30px"
              background="#ffffff"
              $borderColor="#4064E6"
              color="#4064E6"
              hoverBk="#ffffff"
              fontSize="20"
              onClick={handleClose}
            />
          </ButtonContainer>
        </FullContainer>
      </RootIn>
    </CommonRoot>
  );
};
export default FindForm;
