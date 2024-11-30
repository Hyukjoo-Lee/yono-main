import CommonDialog from '../../common/CommonDialog';
import { useState } from 'react';
import CommonInput from '../../common/CommonInput';
import { PASSWORD2_CONFORM_ERROR } from '../auth/Component/ErrorMessage';
import styled from 'styled-components';
import CommonPageInfo from '../../common/CommonPageInfo';

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
const AlarmPw = ({ open, $setIsDialogPWVisible }) => {
  const [isConfirmClicked, setIsConfirmClicked] = useState(false);
  const [isChangeClicked, setIsChangeClicked] = useState(false);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');
  const [CorrectMessage, setCorrectMessage] = useState('');
  const dummyPassword = {
    password: '123',
    newPassword: '123',
  };

  const ConfirmPWDialog = () => {
    $setIsDialogPWVisible(false);
    setIsConfirmClicked(true);
  };

  const ConfirmPWDialogClose = () => {
    $setIsDialogPWVisible(false);
  };

  const ReChangePWDialog = () => {
    setIsConfirmClicked(false);
    setIsChangeClicked(true);
  };

  const ReChangePWDialogClose = () => {
    setIsChangeClicked(false);
  };

  const RegisterChangePassword = () => {
    password === dummyPassword.password &&
    newPassword === dummyPassword.newPassword
      ? setCorrectMessage('비밀번호가 일치합니다')
      : setErrorMessage(PASSWORD2_CONFORM_ERROR);
  };

  const RegisterChangePasswordClose = () => {
    setIsChangeClicked(false);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangePassword = (e) => {
    setNewPassword(e.target.value);
  };

  const pwDialogProps = {
    width: '500px',
    height: '200px',
    fontSize: '20px',
  };

  return (
    <>
      <CommonDialog
        open={open}
        children="000님의 임시 비밀번호는 000입니다."
        onClick={ConfirmPWDialog}
        onClose={ConfirmPWDialogClose}
        {...pwDialogProps}
      />
      <CommonDialog
        open={isConfirmClicked}
        text2="취소"
        width1="160px"
        children="비밀번호를 재설정 하십시오"
        text1="비밀번호 재설정"
        onClick={ReChangePWDialog}
        onClose={ReChangePWDialogClose}
        {...pwDialogProps}
      />

      <CommonDialog
        open={isChangeClicked}
        width="600px"
        height="300px"
        text2="취소"
        width1="100px"
        children={
          <>
            <CommonPageInfo title="비밀번호 재설정" />

            <CommonInput
              text="비밀번호"
              background="#FFFFFF"
              fontSize="16px"
              color="#464646"
              width="300px"
              height="35px"
              value={password}
              onChange={handlePassword}
            />
            <CommonInput
              text="비밀번호 확인"
              background="#FFFFFF"
              fontSize="16px"
              color="#464646"
              width="300px"
              value={newPassword}
              onChange={handleChangePassword}
            />
            <HiddenBox>
              {CorrectMessage && <CorrectMsg>{CorrectMessage}</CorrectMsg>}
              {ErrorMessage && <ErrorMsg>{ErrorMessage}</ErrorMsg>}
            </HiddenBox>
          </>
        }
        fontSize="20px"
        onClick={RegisterChangePassword}
        onClose={RegisterChangePasswordClose}
      />
    </>
  );
};

export default AlarmPw;
