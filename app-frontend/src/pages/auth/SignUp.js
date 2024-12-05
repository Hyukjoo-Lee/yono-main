import CommonRoot from '../../common/CommonRoot';
import styled from 'styled-components';
import CommonInput from '../../common/CommonInput';
import CommonButton from '../../common/CommonButton';
import CommonHr from '../../common/CommonHr';
import CommonPageInfo from '../../common/CommonPageInfo';
import { useState } from 'react';
import SuccessSignUp from './SuccessSignUp';

const FullContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  margin-left: 5px;
`;

const InputIDBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 350px;
`;

const InputPWBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 350px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
  margin-left: 5px;
`;

const ContainerProps = {
  marginBottom: '13px',
};

const InputProps = {
  width: '350px',
  $borderColor: 'transparent',
  background: 'transparent',
  $focusBorderColor: 'transparent',
  $marginLeft: '7px',
};
const ButtonProps = {
  width: '73px',
  height: '37px',
  background: '#F5F5F5',
  text: '확인',
  color: '#757575',
};
export function SignUp() {
  const [isDialogPWVisible, setIsDialogPWVisible] = useState(false);

  const inputRegexs = {
    // 아이디 : 문자로 시작하여, 영문자, 숫자, 하이픈(-), 언더바(_)를 사용하여 3~20자 이내
    idRegex: /^[a-zA-Z][a-zA-Z0-9]{2,19}$/,
    // 비밀번호 : 최소 8자 이상, 최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않음
    pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
    // 닉네임 : 영어 대/소문자, 숫자, 한글 자모음 조합, 2~10자 이내
    nicknameRegex: /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/,
  };
  const [inputValue, setInputValue] = useState({
    id: '', // 입력된 아이디 데이터
    validId: false, // 아이디 정규식 충족 여부
    nonIdDuplication: false, // 아이디 중복확인 여부
    pw: '', // 입력된 패스워드 데이터
    validPw: false, // 패스워드 정규식 충족 여부
    pwCheck: '', // 입력된 패스워드 확인 데이터
    correctPwCheck: false, // 패드워드 데이터와 일치하는지 여부
    nickname: '', // 입력된 닉네임 데이터
    validNickname: false, // 닉네임 정규식 충족 여부
    email: '', // 입력된 이메일 아이디 데이터
    emailAddress: '', // 선댁된 이메일 도메인 데이터
    validEmail: true, // 이메일 인증 여부 (미구현이라 true가 초기값, 추후 리팩토링 예정)
    profileImage: '', // 업로드된 프로필 이미지 (선택사항)
    agree: false, // 정보 제공 동의 여부
  });
  // 조건에 부합할 경우 초록글씨 경고 문구
  const [passMessage, setPassMessage] = useState({
    id: '',
    pw: '',
    pwCheck: '',
    nickname: '',
    email: '',
  });

  // 조건에 부합하지 않는 경우 빨간글씨 경고 문구
  const [alertMessage, setAlertMessage] = useState({
    id: '',
    pw: '',
    pwCheck: '',
    nickname: '',
    email: '',
  });

  // 조건을 모두 충족할 시 제출 버튼 활성화
  const submitRequirements =
    inputValue.id && // 아이디가 입력되었는가?
    inputValue.validId && // 아이디가 정규식에 부합하는가?
    inputValue.nonIdDuplication && // 아이디가 중복되지 않았는가?
    inputValue.pw && // 비밀번호가 입력되었는가?
    inputValue.validPw && // 비밀번호가 정규식에 부합하는가?
    inputValue.pwCheck && // 비밀번호 확인이 입력되었는가?
    inputValue.correctPwCheck && // 비밀번호 확인이 비밀번호와 일치하는가?
    inputValue.nickname && // 닉네임이 입력되었는가?
    inputValue.nicknameDuplication && // 닉네임이 중복되지 않았는가?
    inputValue.emailId && // 이메일 아이디를 입력하였는가?
    inputValue.emailAddress && // 이메일 도메인 주소를 선택하였는가?
    inputValue.validEmail; // 이메일이 인증되었는가?

  const validateId = () => {
    if (!inputValue.id.match(inputRegexs.idRegex)) {
      setAlertMessage((prev) => ({
        ...prev,
        id: '문자로 시작하여, 영문자, 숫자를 사용하여 3~20자 이내로 작성하세요',
      }));
      setPassMessage((prev) => ({ ...prev, id: '' }));
      return false;
    } else {
      setAlertMessage((prev) => ({ ...prev, id: '' }));
      setPassMessage((prev) => ({ ...prev, id: '사용 가능한 아이디 입니다' }));
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 방지

    // 유효성 검사 (모든 항목을 검사)
    let isValid = true;
    let newAlertMessages = { ...alertMessage };
    let newCorrectMessages = { ...passMessage };

    // 아이디 유효성 검사
    if (inputValue.id === '') {
      newAlertMessages.pw = '아이디 입력해주세요';
      isValid = false;
    }

    // 비밀번호 유효성 검사
    if (inputValue.pw === '') {
      newAlertMessages.pw = '비밀번호 입력해주세요';
      isValid = false;
    } else if (!inputValue.pw.match(inputRegexs.pwRegex)) {
      newAlertMessages.pw =
        '최소 8자 이상, 최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않습니다';
      isValid = false;
    }

    // 비밀번호 확인
    if (inputValue.pwCheck === '') {
      newAlertMessages.pwCheck = '비밀번호 확인을 입력해주세요';
      isValid = false;
    } else if (inputValue.pw !== inputValue.pwCheck) {
      newAlertMessages.pwCheck = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    } else {
      newCorrectMessages.pwCheck = '비밀번호가 일치합니다';
    }

    // 닉네임 유효성 검사
    if (!inputValue.nickname) {
      newAlertMessages.nickname = '닉네임을 입력해주세요';
      isValid = false;
    } else if (!inputValue.nickname.match(inputRegexs.nicknameRegex)) {
      newAlertMessages.nickname =
        '영어 대/소문자, 숫자, 한글 자모음 조합, 2~10자 이내로 입력해주세요';
      isValid = false;
    }

    // 이메일 유효성 검사
    if (inputValue.email === '') {
      newAlertMessages.email = '이메일을 입력해주세요'; // 이메일이 비어 있을 때 경고 메시지
      isValid = false;
    } else if (!inputValue.email.match(inputRegexs.emailRegex)) {
      newAlertMessages.email = '이메일 형식이 올바르지 않습니다.'; // 이메일 형식이 잘못됐을 때 경고 메시지
      isValid = false;
    }

    setAlertMessage(newAlertMessages); // 상태 업데이트
    setPassMessage(newCorrectMessages); // 상태 업데이트

    // 모든 유효성 검사 통과 시
    if (isValid) {
      setIsDialogPWVisible(true); // 조건 만족 시 다이얼로그 표시
    }
  };
  return (
    <CommonRoot>
      <FullContainer>
        <MiddleContainer>
          <CommonPageInfo title="회원가입" text={<p></p>} />
          <MiddleTitle>회원정보입력</MiddleTitle>
          <CommonHr />
          <div style={ContainerProps} />
          <InputIDBox>
            <CommonInput
              placeholder="아이디를 입력하세요"
              text="아이디"
              onChange={(e) =>
                setInputValue({ ...inputValue, id: e.target.value })
              }
              {...InputProps}
            />
            <CommonButton
              {...ButtonProps}
              text="중복확인"
              width="100px"
              onClick={validateId}
            />
          </InputIDBox>
          {alertMessage.id && <ErrorMessage>{alertMessage.id}</ErrorMessage>}
          <CommonHr />
          <div style={ContainerProps} />
          <CommonInput
            placeholder="비밀번호를 입력하세요"
            text="비밀번호"
            onChange={(e) =>
              setInputValue({ ...inputValue, pw: e.target.value })
            }
            {...InputProps}
          />
          {alertMessage.id && <ErrorMessage>{alertMessage.pw}</ErrorMessage>}
          <CommonHr />
          <InputPWBox>
            <div style={ContainerProps} />
            <CommonInput
              placeholder="비밀번호 확인해주세요"
              text="비밀번호 확인"
              onChange={(e) =>
                setInputValue({ ...inputValue, pwCheck: e.target.value })
              }
              {...InputProps}
            />
          </InputPWBox>
          {alertMessage.pwCheck && (
            <ErrorMessage>{alertMessage.pwCheck}</ErrorMessage>
          )}
          <CommonHr />
          <div style={ContainerProps} />
          <CommonInput
            placeholder="닉네임을 입력하세요"
            text="닉네임"
            onChange={(e) =>
              setInputValue({ ...inputValue, nickname: e.target.value })
            }
            {...InputProps}
          />
          {alertMessage.nickname && (
            <ErrorMessage>{alertMessage.nickname}</ErrorMessage>
          )}
          <CommonHr />
          <div style={ContainerProps} />
          <CommonInput
            placeholder="이메일을 입력하세요"
            text="이메일"
            onChange={(e) =>
              setInputValue({ ...inputValue, email: e.target.value })
            }
            {...InputProps}
          />
          {alertMessage.email && (
            <ErrorMessage>{alertMessage.email}</ErrorMessage>
          )}
          <CommonHr />
          <div style={ContainerProps} />{' '}
          <CommonButton {...ButtonProps} text="완료" onClick={handleSubmit} />
          <SuccessSignUp
            open={isDialogPWVisible}
            setSuccessVisible={setIsDialogPWVisible}
          />
        </MiddleContainer>
      </FullContainer>
    </CommonRoot>
  );
}
