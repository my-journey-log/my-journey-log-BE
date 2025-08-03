import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const isLoggedIn = true;
    const userName = "사용자";

    return (
        <header className="app-header">
            <div className="logo">
                <Link to="/">My Journey Log</Link>
            </div>
            <nav className="main-nav">
                <Link to="/chatbot">챗봇 코스</Link>
                <Link to="/posts">게시판</Link>
                {isLoggedIn ? (
                    <>
                        <span>{userName}님</span>
                        <button onClick={() => alert('로그아웃 기능 구현')}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/register">회원가입</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;