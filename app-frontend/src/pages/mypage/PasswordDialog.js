import { useState } from 'react';
import CommonDialog from '../../common/CommonDialog';
import CommonInput from '../../common/CommonInput';
import { PASSWORDCONFIRM_FAIL_MESSAGE } from '../../common/Message';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { updatePwd, validatePwd } from '../../apis/userApi';

const StyledHr = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 5px;
`;

const abledInputProps = {
  width: '400px',
  background: 'transparent',
  $borderColor: 'transparent',
  $marginLeft: '10px',
  $focusBorderColor: 'transparent',
};

const InnerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 15px;
  & div > p {
    margin-left: 10px;
    text-align: left;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0 0;
  text-align: left;
  white-space: pre-line;
`;

const PasswordDialog = ({ isShowDialog, onClose, password, userInfo }) => {
  const [passwordInfo, setPasswordInfo] = useState({
    originPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const passwordField = [
    {
      name: 'originPassword',
      text: '기존 비밀번호',
      placeholder: '기존 비밀번호를 입력하세요',
      disabled: true,
    },
    {
      name: 'newPassword',
      text: '새로운 비밀번호',
      placeholder: '새 비밀번호를 입력하세요',
      disabled: true,
    },
    {
      name: 'confirmPassword',
      text: '비밀번호 확인',
      placeholder: '비밀번호 확인을 입력하세요',
      disabled: true,
    },
  ];

  const handlePasswordChange = (key, value) => {
    setPasswordInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const passwordRegexs = {
    password: /^(?=.*[a-z])(?=.*\d)(?=.*[*@#$%^&+=!]).{8,}$/,
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const userData = {
      userId: userInfo?.userId,
      password: passwordInfo.originPassword,
    };

    try {
      const response = await validatePwd(userData);

      // 성공 시
      if (response.data.status === 200) {
        setPasswordError(false);
        await updatePwd(passwordInfo.newPassword, userInfo.userId);
        navigate(0);
      }
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.status === 401) {
        setPasswordError(true);
        setErrorMessage('기존 비밀번호가 일치하지 않습니다!');
      } else if (!passwordRegexs.password.test(passwordInfo.newPassword)) {
        setPasswordError(true);
        setErrorMessage(
          '비밀번호는 소문자, 숫자, 특수문자(@#$%^&+=!)를\n포함해 8자 이상으로 입력해주세요.',
        );
      } else if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
        setPasswordError(true);
        setErrorMessage(PASSWORDCONFIRM_FAIL_MESSAGE);
      }
    }
  };

  return (
    <CommonDialog
      open={isShowDialog}
      onClose={onClose}
      onClick={handleClick}
      cancelBtn={true}
      submitText="변경"
      children={
        <form onSubmit={handleClick}>
          {passwordField.map((field, index) => (
            <InnerSection key={index}>
              <CommonInput
                value={passwordInfo[field.name]}
                text={field.text}
                placeholder={field.placeholder}
                type="password"
                autoComplete="new-password"
                onChange={(e) =>
                  handlePasswordChange(field.name, e.target.value)
                }
                {...abledInputProps}
              />

              <StyledHr />
            </InnerSection>
          ))}
          {passwordError && <ErrorText>{errorMessage}</ErrorText>}
        </form>
      }
    />
  );
};

export default PasswordDialog;
