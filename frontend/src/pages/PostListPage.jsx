import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api/postApi'; // getPosts 임포트 (백엔드에 맞춰 POST)
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function PostListPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const userId = 1; // 예시 userId
                const requestData = { userId: userId };
                const data = await getPosts(requestData);
                setPosts(data);
            } catch (err) {
                setError('게시물 목록을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div className="post-list-page">
            <h2>모든 게시물</h2>
            <Link to="/posts/new" className="button create-post-button">새 게시물 작성</Link>
            <div className="posts-container">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <PostCard key={post.id} post={post} /> // Post 엔티티를 PostCard에 전달
                    ))
                ) : (
                    <p>게시물이 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default PostListPage;