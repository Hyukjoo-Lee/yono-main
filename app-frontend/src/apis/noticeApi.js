import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;
console.log('API_BASE_URL:', API_BASE_URL);

//글 등록
export const createNotice = async (formData) => {
  try {
    const response = await axios.post('/notice/write', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.status === 200) {
      return { success: true, message: response.data.message };
    } else {
      return { success: false, message: response.data.message };
    }
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

    console.log('response.data:', response.data);

    if (response.data.status === 200) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('API 요청 실패:', error);
    return { success: false, message: 'API 요청에 실패했습니다.' };
  }
};

//공지사항 상세
export const fetchNoticeDetail = async (id) => {
  try {
    const response = await axios.get('/notice/detail', {
      params: { id },
    });

    if (response.data.status === 200) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('공지사항 불러오기 실패 11: ', error);
    return { success: false, message: '공지사항 불러오기 실패' };
  }
};

// 공지사항 삭제
export const deleteNotice = async (ids) => {
  try {
    const response = await axios.post('/notice/delete', ids);

    if (response.data.status === 200) {
      return { success: true, message: response.data.message };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('서버 오류 : ', error.response ? error.response.data : error);
    return { success: false, message: '공지사항 삭제 실패' };
  }
};

export const getNoticeById = async (id) => {
  try {
    const response = await axios.post(`/notice/edit`, {
      params: { id },
    });

    return response.data;
  } catch (error) {
    console.error('공지사항 불러오기 실패 11: ', error);
    throw error;
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

    console.log('공지사항 수정 응답:', response.data); // 응답 데이터 출력

    if (response.data.status === 200) {
      return {
        success: true,
        message: response.data.message,
        data: response.data.data,
      };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('공지사항 수정 중 오류 발생 : ', error);
    return { success: false, message: '수정 중 오류 발생' };
  }
};
