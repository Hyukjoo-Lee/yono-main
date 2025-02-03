import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;
console.log('API_BASE_URL:', API_BASE_URL);

// 공지사항 등록
export const createNotice = async (formData) => {
  try {
    const response = await axios.post('/notice/write', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API 호출 오류 : ', error);
    return {
      success: false,
      message: error.response
        ? error.response.data.message
        : '서버 오류가 발생',
    };
  }
};

// 공지사항 검색(리스트)
export const fetchSearchNotice = async (keyword) => {
  try {
    const response = await axios.get('/notice/list', {
      params: { keyword },
    });
    return response.data;
  } catch (error) {
    console.error('API 요청 실패:', error);
    return { success: false, message: 'API 요청에 실패했습니다.' };
  }
};

//공지사항 상세
export const fetchNoticeDetail = async (id) => {
  const response = await axios.get('/notice/detail', {
    params: { id },
  });
  return response.data;
};

// 공지사항 삭제
export const deleteNotice = async (ids) => {
  try {
    const response = await axios.post('/notice/delete', ids);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('서버 오류 : ', error.response.data);
      throw new Error(error.response.data.message || '공지사항 삭제 실패');
    } else if (error.request) {
      console.error('응답없음 : ', error.request);
      throw new Error('서버 응답을 받지 못했습니다. 다시 시도해주세요');
    } else {
      console.log('요청 오류 : ', error.message);
      throw new Error(
        '공지사항 삭제 중 오류가 발생했습니다. 다시 시도해주세요',
      );
    }
  }
};

export const getNoticeById = async (id) => {
  try {
    // id가 객체라면 문자열로 변환해서 전달
    const response = await axios.post(`/notice/edit`, {
      params: { id },
    });
    // const response = await axios.get(`/notice/${id}`);
    // const response = await axios.get(`${API_BASE_URL}/notice/${id}`);

    return response.data;
  } catch (error) {
    console.error('공지사항 불러오기 실패 11: ', error);
    throw error; // 오류 발생 시 그대로 던져줍니다.
  }
};

//수정
export const updateNotice = async (formData) => {
  try {
    const response = await axios.post('/notice/edit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('공지사항 수정 중 오류 발생 : ', error);
    return { success: false, message: '수정 중 오류 발생' };
  }
};
