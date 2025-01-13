import axios from 'axios';

export const sendMail = async (email) => {
  const response = await axios.post('/email/sendCode', { email: email });
  return response.data;
};

export const sendTempPwd = async (email, tempPwd) => {
  const response = await axios.post('/email/sendTempPwd', {
    email: email,
    tempPwd: tempPwd,
  });
  return response.data;
};
