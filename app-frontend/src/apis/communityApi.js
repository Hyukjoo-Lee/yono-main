import axios from 'axios';

export const saveCont = async () => {
  await axios.get('/community/saveCont');
};
