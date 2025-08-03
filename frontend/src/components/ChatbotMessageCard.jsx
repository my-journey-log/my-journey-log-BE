import React from 'react';
import './ChatbotMessageCard.css'; // 카드 스타일 추가 (예시)

function ChatbotMessageCard({ day, time, recomm, description, isSelected, onSelect }) {
    return (
        <div className={`chatbot-message-card ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
            <div className="card-header">
                <h3>{day} - {time}</h3>
            </div>
            <div className="card-body">
                <p><strong>추천:</strong> {recomm}</p>
                <p className="description-text">{description}</p>
            </div>
            {onSelect && ( // onSelect 프롭스가 있을 때만 선택 UI 렌더링
                <div className="card-footer">
                    <label>
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={onSelect} // 클릭 이벤트가 카드 div에 있으므로, 체크박스 자체의 onChange는 부모에서 받은 onSelect 그대로 사용
                            onClick={(e) => e.stopPropagation()} // 체크박스 클릭 시 카드 전체 클릭 이벤트 방지
                        />
                        이 코스 선택
                    </label>
                </div>
            )}
        </div>
    );
}

export default ChatbotMessageCard;
