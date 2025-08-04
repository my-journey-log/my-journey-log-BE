import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css'; // 카드 스타일 추가 (예시)

function PostCard({ post }) {
    // 이미지 URL이 여러 개일 수 있으므로 첫 번째 이미지만 표시
    const imageUrl = post.imageFieldName && post.imageFieldName.length > 0 ? post.imageFieldName[0] : 'https://placehold.co/150x100/eeeeee/cccccc?text=No+Image';

    return (
        <Link to={`/posts/${post.id}`} className="post-card-link">
            <div className="post-card">
                <img src={imageUrl} alt={post.title} className="post-card-image" />
                <div className="post-card-content">
                    <h4>{post.title}</h4>
                    <p className="post-card-excerpt">{post.content.substring(0, 100)}...</p>
                    <p className="post-card-meta">작성자 ID: {post.userId} | {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;