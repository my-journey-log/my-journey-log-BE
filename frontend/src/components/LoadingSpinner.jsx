import React from 'react';
import './LoadingSpinner.css'; // 스피너 스타일 추가 (예시)

function LoadingSpinner() {
    return (
        <div className="spinner-container">
            <div className="loading-spinner"></div>
            <p>로딩 중...</p>
        </div>
    );
}

export default LoadingSpinner;