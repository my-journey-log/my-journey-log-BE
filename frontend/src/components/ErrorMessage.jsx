import React from 'react';

function ErrorMessage({ message }) {
    return (
        <div className="error-message">
            <p>오류: {message}</p>
        </div>
    );
}

export default ErrorMessage;