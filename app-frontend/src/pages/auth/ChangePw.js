import CommonDialog from '../../common/CommonDialog';
import CommonInput from '../../common/CommonInput';
import { useState } from 'react';
import { PASSWORD2_CONFORM_ERROR } from '../auth/Component/ErrorMessage';
import styled from 'styled-components';
const HiddenBox = styled.div`
  display: flex;
  margin-left: 28%;
  margin-bottom: 2%;
`;
const ErrorMsg = styled.div`
  color: red;
  font-size: 13px;
`;
const CorrectMsg = styled.div`
  color: blue;
  font-size: 13px;
`;
export function ChangePw() {
  const [password, setPassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');
  const [CorrectMessage, setCorrectMessage] = useState('');

  const dummyPassword = {
    password: '123',
    newpassword: '123',
  };

  const handlepassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangepassword = (e) => {
    setNewpassword(e.target.value);
  };
  const ChangePassword = () => {
    password === dummyPassword.password &&
    newpassword === dummyPassword.newpassword
      ? setCorrectMessage('비밀번호가 일치합니다')
      : setErrorMessage(PASSWORD2_CONFORM_ERROR);
  };
  return (
    <div style={{ position: 'relative' }}>
      <CommonDialog
        $visible={true}
        width="600px"
        height="300px"
        text2="취소"
        width1="100px"
        children={
          <>
            <p>비밀번호 재설정</p>

            <CommonInput
              text="비밀번호"
              background="#FFFFFF"
              fontSize="16px"
              color="#464646"
              width="300px"
              height="35px"
              value={password}
              onChange={handlepassword}
            />
            <CommonInput
              text="비밀번호 확인"
              background="#FFFFFF"
              fontSize="16px"
              color="#464646"
              width="300px"
              height="35px"
              value={newpassword}
              onChange={handleChangepassword}
            />
            <HiddenBox>
              {CorrectMessage && <CorrectMsg>{CorrectMessage}</CorrectMsg>}
              {ErrorMessage && <ErrorMsg>{ErrorMessage}</ErrorMsg>}
            </HiddenBox>
          </>
        }
        $Contentwidth="450px"
        $Contentheight="150px"
        fontSize="20px"
        onClick={ChangePassword}
        navigateTo={'/CompleteChangePw'}
        navigateMain={'/MainPage'}
      />
    </div>
  );
}
export default ChangePw;
