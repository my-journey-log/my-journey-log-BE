import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoMap from '../components/KakaoMap';
// import { savePlace } from '../api/placeApi'; // TODO: Place API 필요시 임포트

function HomePage() {
    const [destination, setDestination] = useState('');
    const navigate = useNavigate();

    const handleSaveDestination = async () => {
        if (destination.trim()) {
            // TODO: 백엔드 API 호출하여 목적지 저장 (Place 객체)
            // 예시: await savePlace({ name: destination, userId: 1 }); // userId는 로그인된 사용자 ID
            alert(`목적지 "${destination}" 저장 (API 연동 예정)`);
            navigate('/chatbot', { state: { selectedDestination: destination } }); // 챗봇 페이지로 이동하며 목적지 전달
        } else {
            alert('목적지를 입력해주세요.');
        }
    };

    return (
        <div className="home-page">
            <h2>메인 화면</h2>
            <div className="map-area">
                <KakaoMap /> {/* <-- 여기에 KakaoMap 컴포넌트 렌더링 */}
            </div>
            <div className="destination-input">
                <input
                    type="text"
                    placeholder="여행 목적지를 입력하세요 (예: 속초)"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
                <button onClick={handleSaveDestination}>목적지 저장</button>
            </div>
        </div>
    );
}

export default HomePage;