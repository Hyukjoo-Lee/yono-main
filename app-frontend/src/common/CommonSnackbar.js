import React, { useState } from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CommonButton from "./CustomButton";
import styled from "styled-components";

const CommonSnackbarStyle = styled(Snackbar)`
  max-width: ${(props) => props.maxWidth || "400px"};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "auto"};
  border-radius: ${(props) => props.borderRadius || "8px"} !important;
`;

const CustomAlert = styled(Alert)`
  background-color: ${(props) => props.background || props.theme.color.lightBlue} !important;
  color: ${(props) => props.color || "black"} !important;
  width: 100%;
  height: 100%;
`;

const CommonSnackbar = ({
  buttonText = "Snackbar 테스트",
  buttonTextSize = "14px",
  message = "기본 메시지",
  type = "success",
  position = { vertical: "top", horizontal: "center" },
  duration = 3000,
  maxWidth,
  width,
  height,
  borderRadius,
  background,
  color,
  marginTop
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: marginTop,
      }}
    >
      <CommonButton text={buttonText} fontSize={buttonTextSize} onClick={handleOpenSnackbar} />
      
      <CommonSnackbarStyle
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={duration}
        anchorOrigin={position}
        maxWidth={maxWidth}
        width={width}
        height={height}
        borderRadius={borderRadius}
        key={position.vertical + position.horizontal}
      >
        <CustomAlert
          onClose={handleCloseSnackbar}
          severity={type}
          background={background}
          color={color}
        >
          {message}
        </CustomAlert>
      </CommonSnackbarStyle>
    </Box>
  );
};

export default CommonSnackbar;
