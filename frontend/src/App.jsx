import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatbotPage from './pages/ChatbotPage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import PostWritePage from './pages/PostWritePage';
import Login from "./components/Login";
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    // const [user, setUser] = useState(null);
    //
    // if (!user) {
    //     return <Login onLogin={setUser} />;
    // }

    return (
        <div className="App">
            <Header /> {/* Header 컴포넌트가 여기에 렌더링됩니다. */}
            <main className="content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/chatbot" element={<ChatbotPage />} />
                    <Route path="/posts" element={<PostListPage />} />
                    <Route path="/posts/:id" element={<PostDetailPage />} />
                    <Route path="/posts/new" element={<PostWritePage />} />
                    <Route path="/posts/:id/edit" element={<PostWritePage />} />

                    {/* 404 Not Found 페이지 */}
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
