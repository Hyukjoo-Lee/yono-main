import React, { useState } from 'react';
import CustomButton from '../../common/CommonButton';
import CommonInput from '../../common/CommonInput';

const BadgeInfo = () => {
  const [inputDisabled, setInputDisabled] = useState(true);
  const [backgroundColor, setbackgroundColor] = useState('#F5F5F5');

  const modify = () => {
    setInputDisabled(false);
    setbackgroundColor('#F8F9FE');
  };

  const commonInputProps = {
    disabled: inputDisabled,
    background: backgroundColor,
    width: '350px',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <CommonInput
        placeholder="이번 달 목표 지출금액"
        text="이번 달 목표 지출금액"
        {...commonInputProps}
      />

      <div style={{ marginTop: '15px' }}>
        <CustomButton
          text="수정"
          onClick={modify}
          width="100px"
          height="38px"
        />
      </div>
    </div>
  );
};

export default BadgeInfo;
