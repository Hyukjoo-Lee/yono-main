import CommonDialog from '../../common/CommonDialog';
import { useState } from 'react';
import CommonInput from '../../common/CommonInput';
import { PASSWORD2_CONFORM_ERROR } from '../auth/Component/ErrorMessage';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HiddenBox = styled.div`
  display: flex;
  margin-left: 28%;
  margin-bottom: 2%;
`;
const ErrorMsg = styled.div`
  color: red;
  font-size: 13px;
`;
// const CorrectMsg = styled.div`
//   color: blue;
//   font-size: 13px;
// `;
const AlarmPw = ({ open, $setIsDialogPWVisible }) => {
  const [isConfirmClicked, setIsConfirmClicked] = useState(false);
  const [isChangeClicked, setIsChangeClicked] = useState(false);
  const [successChangePW, setSuccessChangePW] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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
    setIsConfirmClicked(false);
    setIsChangeClicked(false);
  };

  const RegisterChangePassword = () => {
    if (password === '' || newPassword === '') {
      setErrorMessage('답변을 입력해 주세요');
      setSuccessChangePW(false);
    } else if (password !== newPassword) {
      setErrorMessage(PASSWORD2_CONFORM_ERROR);
      setSuccessChangePW(false);
    } else {
      setErrorMessage('');
      setIsChangeClicked(false);
      setSuccessChangePW(true);
    }
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

  const changepwclose = () => {
    navigate('/');
  };

  const pwDialogProps = {
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
        text1="비밀번호 재설정"
        children="비밀번호를 재설정 하십시오"
        onClick={ReChangePWDialog}
        onClose={ReChangePWDialogClose}
        {...pwDialogProps}
      />

      <CommonDialog
        open={isChangeClicked}
        height="200px"
        fontSize="25px"
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
              {ErrorMessage && <ErrorMsg>{ErrorMessage}</ErrorMsg>}
            </HiddenBox>
          </>
        }
        onClick={RegisterChangePassword}
        onClose={RegisterChangePasswordClose}
      />
      <CommonDialog
        open={successChangePW}
        children="비밀번호가 변경되었습니다"
        onClick={changepwclose}
        {...pwDialogProps}
      />
    </>
  );
};

export default AlarmPw;
