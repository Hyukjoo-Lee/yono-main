import React from 'react';
import styled from 'styled-components';
import CustomButton from './CommonButton';
import { Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DialogStyle = styled(Dialog)`
  & .MuiPaper-root {
    max-width: 1000px;
    min-width: 400px;
    & *,
    p {
      font-family: 'Noto Sans KR';
    }
  }
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 0px 24px;
  & h2 {
    padding: 0px;
  }
`;

const ContentsBox = styled.div`
  padding: 24px;
  & p {
    font-size: ${(props) => props.theme.fontSize.eighteen};
    text-align: center;
    margin: 0px;
  }
`;

const IconButtonStyle = styled(IconButton)`
  &.MuiButtonBase-root {
    &:hover {
      background: transparent;
    }
  }
`;

const DialogActionsStyle = styled(DialogActions)`
  &.MuiDialogActions-root {
    justify-content: center;
    padding: 20px 24px 18px;
  }
`;

const CommonDialog = (props) => {
  const {
    open,
    onClose,
    onClick,
    title,
    children,
    submitText,
    cancelBtn = false,
    cancelText,
  } = props;

  return (
    <DialogStyle open={open} onClose={onClose}>
      <TitleBox>
        <DialogTitle>{title}</DialogTitle>
        <IconButtonStyle onClick={onClose} disableRipple>
          <CloseIcon />
        </IconButtonStyle>
      </TitleBox>

      <ContentsBox>{children}</ContentsBox>

      <DialogActionsStyle>
        <CustomButton
          text={submitText || '확인'}
          width="50px"
          height="30px"
          background="#4064E6"
          color="#ffffff"
          onClick={onClick}
        />
        {cancelBtn && (
          <CustomButton
            text={cancelText || '취소'}
            width="50px"
            height="30px"
            background="#ffffff"
            $borderColor="#4064E6"
            color="#4064E6"
            hoverBk="#ffffff"
            hoverColor="#4064E6"
            onClick={onClose}
            autoFocus
          />
        )}
      </DialogActionsStyle>
    </DialogStyle>
  );
};
export default CommonDialog;
