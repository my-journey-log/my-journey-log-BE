import api from './axiosConfig';


export const getRecommendedCourses = async (requestData) => {
    try {
        const response = await api.post('/chatbot', requestData);
        return response.data;
    } catch (error) {
        console.error('챗봇 API 호출 실패:', error);
        throw error;
    }
};