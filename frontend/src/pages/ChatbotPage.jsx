import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRecommendedCourses } from '../api/chatbotApi';
import { saveCourses } from '../api/courseApi';
import ChatbotMessageCard from '../components/ChatbotMessageCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function ChatbotPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedDestinationFromHome = location.state?.selectedDestination || '';

    // TODO: 실제 userId는 로그인 상태에서 가져와야 합니다.
    const [userId, setUserId] = useState(1); // 예시 userId

    const [destination, setDestination] = useState(selectedDestinationFromHome);
    const [date, setDate] = useState('2일'); // 기본값 2일
    const [target, setTarget] = useState('혼자 여행, 맛집 탐방'); // 기본값

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recommendedCourses, setRecommendedCourses] = useState([]); // 챗봇 추천 코스

    const [selectedCourseIndices, setSelectedCourseIndices] = useState(new Set()); // 사용자가 선택한 코스 인덱스
    const [manualCourses, setManualCourses] = useState([]); // 사용자가 직접 입력한 코스
    const [currentManualInput, setCurrentManualInput] = useState({ day: '', time: '', recomm: '', description: '' });
    const [savingPlan, setSavingPlan] = useState(false);

    useEffect(() => {
        if (selectedDestinationFromHome) {
            setDestination(selectedDestinationFromHome);
        }
    }, [selectedDestinationFromHome]);

    const handleGetRecommendation = async () => {
        if (!destination.trim() || !date || !target.trim()) {
            alert('목적지, 일정, 여행 목적을 모두 입력해주세요.');
            return;
        }

        setLoading(true);
        setError(null);
        setRecommendedCourses([]);
        setSelectedCourseIndices(new Set());
        setManualCourses([]);

        try {
            const requestData = {
                place: destination,
                date: date,
                target: target,
                userId: userId // 백엔드 ChatbotRequest에 userId 필드가 있다면 포함
            };
            const courses = await getRecommendedCourses(requestData); // userId를 requestData에 포함하여 전달
            setRecommendedCourses(courses);
        } catch (err) {
            setError('코스 추천에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleCourseSelection = (index) => {
        const newSelected = new Set(selectedCourseIndices);
        if (newSelected.has(index)) {
            newSelected.delete(index);
        } else {
            newSelected.add(index);
        }
        setSelectedCourseIndices(newSelected);
    };

    const handleManualInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentManualInput(prev => ({ ...prev, [name]: value }));
    };

    const handleAddManualCourse = () => {
        if (currentManualInput.day && currentManualInput.time && currentManualInput.recomm && currentManualInput.description) {
            setManualCourses(prev => [...prev, { ...currentManualInput, isLlmRecommended: false }]);
            setCurrentManualInput({ day: '', time: '', recomm: '', description: '' });
        } else {
            alert('직접 입력 코스의 모든 필드를 채워주세요.');
        }
    };

    const handleSavePlan = async () => {
        setSavingPlan(true);
        setError(null);

        const coursesToSave = [];

        // 챗봇 추천 코스 중 선택된 코스 추가
        recommendedCourses.forEach((course, index) => {
            if (selectedCourseIndices.has(index)) {
                coursesToSave.push({
                    userId: userId,
                    day: course.day,
                    time: course.time,
                    recomm: course.recomm,
                    description: course.description,
                    isLlmRecommended: true // 챗봇 추천
                });
            }
        });

        // 사용자가 직접 입력한 코스 추가
        manualCourses.forEach(course => {
            coursesToSave.push({
                userId: userId,
                day: course.day,
                time: course.time,
                recomm: course.recomm,
                description: course.description,
                isLlmRecommended: false // 사용자 직접 입력
            });
        });

        if (coursesToSave.length === 0) {
            alert('저장할 코스를 하나 이상 선택하거나 직접 입력해주세요.');
            setSavingPlan(false);
            return;
        }

        try {
            // TODO: 백엔드 CourseController의 saveCourse (@RequestBody List<Course> course) 엔드포인트 호출
            // 백엔드가 List<Course> 엔티티를 직접 받는다고 가정하고 호출
            await saveCourses(coursesToSave); // courseApi.js의 saveCourses 함수 호출

            alert('선택/입력된 코스가 성공적으로 저장되었습니다!');
            navigate('/posts/new', { state: { savedCourses: coursesToSave, destination: destination, userId: userId } });

        } catch (err) {
            setError('플랜 저장에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setSavingPlan(false);
        }
    };

    return (
        <div className="chatbot-page">
            <h2>챗봇에게 코스 추천받기</h2>
            <div className="input-section">
                <label>
                    여행 목적지:
                    <input
                        type="text"
                        placeholder="예: 속초"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        disabled={loading}
                    />
                </label>
                <label>
                    여행 일정:
                    <select value={date} onChange={(e) => setDate(e.target.value)} disabled={loading}>
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
                        disabled={loading}
                    />
                </label>
                <button onClick={handleGetRecommendation} disabled={loading}>
                    {loading ? <LoadingSpinner /> : '코스 추천받기'}
                </button>
                {error && <ErrorMessage message={error} />}
            </div>

            {recommendedCourses.length > 0 && (
                <div className="recommendation-results">
                    <h3>추천된 코스</h3>
                    <div className="course-cards-container">
                        {recommendedCourses.map((course, index) => (
                            <ChatbotMessageCard
                                key={index}
                                day={course.day}
                                time={course.time}
                                recomm={course.recomm}
                                description={course.description}
                                isSelected={selectedCourseIndices.has(index)}
                                onSelect={() => handleToggleCourseSelection(index)}
                            />
                        ))}
                    </div>

                    <div className="manual-course-input">
                        <h3>직접 코스 추가</h3>
                        <input name="day" placeholder="일차 (예: 2일차)" value={currentManualInput.day} onChange={handleManualInputChange} />
                        <input name="time" placeholder="시간대 (예: 저녁)" value={currentManualInput.time} onChange={handleManualInputChange} />
                        <input name="recomm" placeholder="추천 (예: 속초 맛집 & 해변)" value={currentManualInput.recomm} onChange={handleManualInputChange} />
                        <textarea name="description" placeholder="상세 설명" value={currentManualInput.description} onChange={handleManualInputChange} rows="3"></textarea>
                        <button onClick={handleAddManualCourse}>코스 추가</button>

                        {manualCourses.length > 0 && (
                            <div className="added-manual-courses">
                                <h4>추가된 코스 미리보기:</h4>
                                {manualCourses.map((course, index) => (
                                    <p key={`manual-${index}`}>{course.day} - {course.time}: {course.recomm}</p>
                                ))}
                            </div>
                        )}
                    </div>

                    <button onClick={handleSavePlan} disabled={savingPlan}>
                        {savingPlan ? <LoadingSpinner /> : '선택/입력 코스로 플랜 저장하기'}
                    </button>
                    {error && <ErrorMessage message={error} />}
                </div>
            )}
        </div>
    );
}

export default ChatbotPage;