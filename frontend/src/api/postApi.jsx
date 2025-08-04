import api from './axiosConfig';

// 참고: 백엔드 PostController의 @RequestMapping("/api/v1/post")에 맞춰 경로를 조정합니다.
// RESTful 관례상 /api/v1/posts (복수형)가 더 좋지만, 현재 백엔드에 맞춥니다.

/**
 * 새로운 게시물을 생성합니다.
 * @param {FormData} formData - 게시물 데이터와 이미지 파일을 포함하는 FormData 객체
 * @returns {Promise<object>} 생성된 게시물 정보 (PostDTO)
 */
export const createPost = async (formData) => {
    try {
        const response = await api.post('/api/v1/post/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('게시물 생성 실패:', error);
        throw error;
    }
};

/**
 * 모든 게시물 목록을 조회합니다.
 * 백엔드: POST /api/v1/post/posts (POST로 조회하는 비표준 방식)
 * @param {object} requestData - userId를 포함하는 PostDTO (백엔드에 맞춰)
 * @returns {Promise<Array>} Post 엔티티 리스트 (백엔드에 맞춰)
 */
export const getPosts = async (requestData) => {
    try {
        const response = await api.post('/api/v1/post/posts', requestData);
        return response.data;
    } catch (error) {
        console.error('모든 게시물 조회 실패:', error);
        throw error;
    }
};

/**
 * 특정 게시물의 상세 정보를 조회합니다.
 * 백엔드: POST /api/v1/post/detail (POST로 상세 조회하는 비표준 방식)
 * @param {object} requestData - id를 포함하는 Post 엔티티 (백엔드에 맞춰)
 * @returns {Promise<object>} Post 엔티티 (백엔드에 맞춰)
 */
export const getPostDetail = async (requestData) => {
    try {
        const response = await api.post('/api/v1/post/detail', requestData);
        return response.data;
    } catch (error) {
        console.error('게시물 상세 조회 실패:', error);
        throw error;
    }
};

/**
 * 특정 게시물을 부분적으로 업데이트합니다.
 * @param {number} postId - 게시물 ID (URL 경로에 포함되지 않음, DTO에 포함)
 * @param {FormData} formData - 업데이트할 필드와 이미지 파일을 포함하는 FormData 객체
 * @returns {Promise<string>} 성공 메시지
 */
export const updatePost = async (formData) => {
    try {
        const response = await api.patch('/api/v1/post/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('게시물 업데이트 실패:', error);
        throw error;
    }
};

/**
 * 특정 게시물을 삭제합니다.
 * 백엔드: DELETE /api/v1/post/remove/{id}
 * @param {number} postId - 삭제할 게시물 ID
 * @returns {Promise<string>} 성공 메시지
 */
export const deletePost = async (postId) => {
    try {
        const response = await api.delete(`/api/v1/post/remove/${postId}`);
        return response.data;
    } catch (error) {
        console.error(`게시물 ID ${postId} 삭제 실패:`, error);
        throw error;
    }
};