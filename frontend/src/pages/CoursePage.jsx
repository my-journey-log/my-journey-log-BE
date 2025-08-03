import api from './axiosConfig';

// 참고: 백엔드 CourseController의 @RequestMapping("/api/v1/course")에 맞춰 경로를 조정합니다.

/**
 * 여러 코스 엔티티를 저장합니다.
 * 백엔드: POST /api/v1/course
 * @param {Array<object>} coursesToSave - 저장할 코스 객체 리스트 (List<Course>)
 * @returns {Promise<string>} 성공 메시지
 */
export const saveCourses = async (coursesToSave) => {
    try {
        // 백엔드가 List<Course> 엔티티를 @RequestBody로 직접 받는다고 가정
        const response = await api.post('/api/v1/course', coursesToSave);
        return response.data;
    } catch (error) {
        console.error('코스 저장 실패:', error);
        throw error;
    }
};

/**
 * 특정 사용자의 코스 목록을 조회합니다.
 * 백엔드: GET /api/v1/course?userId={userId}
 * @param {number} userId - 사용자 ID
 * @returns {Promise<Array>} 코스 엔티티 리스트 (List<Course>)
 */
export const getCoursesByUserId = async (userId) => {
    try {
        // 백엔드가 @RequestParam Long userId를 받는다고 가정
        const response = await api.get(`/api/v1/course?userId=${userId}`);
        return response.data; // List<Course> 엔티티가 반환된다고 가정
    } catch (error) {
        console.error(`사용자 ID ${userId}의 코스 조회 실패:`, error);
        throw error;
    }
};