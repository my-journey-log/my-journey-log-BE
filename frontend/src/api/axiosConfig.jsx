import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        // 요청 전에 실행될 로직 (예: 인증 토큰 추가)
        // const token = localStorage.getItem('authToken');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 응답 에러 처리
        if (error.response) {
            console.error('API 응답 오류:', error.response.status, error.response.data);
            // alert(`API 오류: ${error.response.data.message || error.response.status}`);
        } else if (error.request) {
            console.error('API 요청 오류: 응답 없음', error.request);
            // alert('네트워크 오류: 서버에 연결할 수 없습니다.');
        } else {
            console.error('API 요청 설정 오류:', error.message);
            // alert('요청 설정 중 오류가 발생했습니다.');
        }
        return Promise.reject(error);
    }
);

export default api;