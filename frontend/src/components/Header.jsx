import React from 'react';
import { Link } from 'react-router-dom'; // 라우팅을 위한 Link 컴포넌트

function Header() {
    // 실제 앱에서는 로그인 상태에 따라 '로그인/회원가입' 또는 '사용자명/로그아웃'을 표시
    const isLoggedIn = true; // 예시: 로그인 상태 (실제 앱에서는 전역 상태 관리)
    const userName = "사용자"; // 예시: 사용자명

    return (
        <header className="app-header">
            <div className="logo">
                <Link to="/">My Journey Log</Link> {/* 홈으로 이동 */}
            </div>
            <nav className="main-nav">
                {/* Navbar Link items */}
                <Link to="/">홈</Link> {/* 메인 페이지 (지도) */}
                <Link to="/chatbot">챗봇 코스</Link> {/* 챗봇 페이지 */}
                <Link to="/posts">게시판</Link> {/* 게시물 목록 페이지 */}
                {/* TODO: Course 페이지가 있다면 여기에 추가 (예: <Link to="/courses">내 코스</Link>) */}

                {/* User authentication links */}
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