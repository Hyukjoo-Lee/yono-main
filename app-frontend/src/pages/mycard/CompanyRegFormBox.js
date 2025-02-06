import styled from 'styled-components';
import CommonInput from '../../common/CommonInput';
import CommonSelect from '../../common/CommonSelect';
import { Box, Grid2 } from '@mui/material';
import CommonButton from '../../common/CommonButton';
import { useEffect, useState } from 'react';
import ValidationMessage from '../../common/ValidationMessage';
import theme from '../../theme/theme';
import { registerCardCompany } from '../../apis/cardApi';
import CommonDialog from '../../common/CommonDialog';
import CommonLoading from '../../common/CommonLoading';

const FormBox = styled.form`
  width: 100%;
  height: 341px;
  border-radius: 5px;
  background-color: ${(props) => props.background || '#EFF3FD'};
`;

const CARD_COMPANY_LIST = [
  { value: '0301', label: '국민카드' },
  { value: '0302', label: '현대카드' },
  { value: '0303', label: '삼성카드' },
  { value: '0304', label: '농협카드' },
  { value: '0306', label: '신한카드' },
  { value: '0313', label: '하나카드' },
];

const CompanyRegFormBox = ({ user }) => {
  const [formData, setFormData] = useState({
    userNum: '',
    organization: '',
    companyId: '',
    companyPwd: '',
  });

  useEffect(() => {
    if (user && user.userNum) {
      setFormData((prev) => ({
        ...prev,
        userNum: user.userNum,
      }));
    }
  }, [user]);

  const [formMessage, setFormMessage] = useState({
    organization: '',
    companyId: '',
    companyPwd: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [isRegSuccessVisible, setIsRegSuccessVisible] = useState(false);
  const [isRegFailVisible, setIsRegFailVisible] = useState(false);

  const handleInputChange = (field) => (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFormMessage((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.organization) {
      errors.organization = '카드사를 선택하세요.';
    }
    if (!formData.companyId) {
      errors.companyId = '카드사 아이디를 입력하세요.';
    }
    if (!formData.companyPwd) {
      errors.companyPwd = '카드사 비밀번호를 입력하세요.';
    }

    setFormMessage(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const response = await registerCardCompany(formData);
      if (response) {
        setIsRegSuccessVisible(true);

        setFormData({
          userNum: user.userNum || '',
          organization: '',
          companyId: '',
          companyPwd: '',
        });
      } else {
        setIsRegFailVisible(true);
      }
    } catch (error) {
      console.error('카드사 등록 실패:', error);
      setIsRegFailVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const completeReg = () => {
    setIsRegSuccessVisible(false);
  };

  const closeDialog = () => {
    setIsRegFailVisible(false);
  };

  return (
    <FormBox onSubmit={handleSubmit}>
      <Box style={{ padding: '50px' }}>
        {isLoading ? (
          <CommonLoading message={'카드사 등록 처리 중...'} />
        ) : (
          <Grid2 container rowSpacing={2} columnSpacing={4}>
            <Grid2 size={6}>
              <CommonSelect
                text="카드 회사"
                options={CARD_COMPANY_LIST}
                selectedValue={formData.organization}
                setSelectedValue={(value) =>
                  setFormData((prev) => ({ ...prev, organization: value }))
                }
                margin="0"
                labelColor="#4a4a4a"
                width="227.75px"
              />
              {formMessage.organization && (
                <ValidationMessage
                  text={formMessage.organization}
                  type="error"
                  fontSize={theme.fontSize.small}
                  $margin="0 5px"
                />
              )}
            </Grid2>

            <Grid2 size={6}>
              <CommonInput
                placeholder="카드사 아이디를 입력하세요"
                text="아이디"
                value={formData.companyId}
                onChange={handleInputChange('companyId')}
                width="100%"
              />
              {formMessage.companyId && (
                <ValidationMessage
                  text={formMessage.companyId}
                  type="error"
                  fontSize={theme.fontSize.small}
                  $margin="0 5px"
                />
              )}
            </Grid2>

            <Grid2 size={6}>
              <CommonInput
                type="password"
                placeholder="카드사 비밀번호를 입력하세요"
                text="비밀번호"
                value={formData.companyPwd}
                onChange={handleInputChange('companyPwd')}
                autoComplete="off"
                width="100%"
              />
              {formMessage.companyPwd && (
                <ValidationMessage
                  text={formMessage.companyPwd}
                  type="error"
                  fontSize={theme.fontSize.small}
                  $margin="0 5px"
                />
              )}
            </Grid2>

            <Grid2 container justifyContent="center" size={12} pt={3}>
              <CommonButton
                type="submit"
                fontSize="16px"
                width="150px"
                height="40px"
                text="카드사 등록"
              />
            </Grid2>
          </Grid2>
        )}
      </Box>

      <CommonDialog
        open={isRegSuccessVisible}
        children={'카드사 등록에 성공했습니다.'}
        onClose={completeReg}
        onClick={completeReg}
      />
      <CommonDialog
        open={isRegFailVisible}
        children={'카드사 등록에 실패했습니다. 정보를 확인해주세요.'}
        onClose={closeDialog}
        onClick={closeDialog}
      />
    </FormBox>
  );
};

export default CompanyRegFormBox;
