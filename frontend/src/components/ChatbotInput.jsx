import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChatbotInput() {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedDestination = location.state?.selectedDestination || '선택된 목적지 없음';

    const [date, setDate] = useState('1일');
    const [target, setTarget] = useState(''); // 예: "혼자 여행", "관광", "맛집 탐방"
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRecommendCourse = async () => {
        if (!selectedDestination || !date || !target) {
            alert('모든 필수 정보를 입력해주세요.');
            return;
        }

        setLoading(true);
        setError(null);

        try {

            const requestBody = {
                place: selectedDestination,
                date: date,
                target: target,
            };


            const response = await axios.post(`/chatbot`, requestBody);
            console.log('챗봇 응답:', response.data);


            navigate('/course-results', { state: { recommendedCourses: response.data, destination: selectedDestination, userId: userId } });

        } catch (err) {
            console.error('챗봇 코스 추천 실패:', err);
            setError('코스 추천에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-input-page">
            <h2>여행 코스 추천받기</h2>
            <div className="input-section">
                <p>선택된 목적지: <strong>{selectedDestination}</strong></p>
                <label>
                    여행 일정:
                    <select value={date} onChange={(e) => setDate(e.target.value)}>
                        <option value="1일">1일</option>
                        <option value="2일">2일</option>
                        <option value="3일">3일</option>
                    </select>
                </label>
                <label>
                    여행 목적:
                    <input
                        type="text"
                        placeholder="예: 혼자 여행, 맛집 탐방"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                    />
                </label>
                <button onClick={handleRecommendCourse} disabled={loading}>
                    {loading ? '추천 중...' : '코스 추천받기'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}

export default ChatbotInputPage;