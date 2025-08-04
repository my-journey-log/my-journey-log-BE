import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css'; // 카드 스타일 추가 (예시)


function PostCard({ post }) {
    // post.imageUrls는 이미 백엔드에서 List<String> (URL)으로 넘어오므로,
    // .split(',') 없이 바로 배열로 사용합니다.
    const imageUrlsToDisplay = post.imageUrls || []; // null 또는 undefined일 경우 빈 배열로 초기화

    // 이미지 URL이 여러 개일 수 있으므로 첫 번째 이미지만 표시
    const imageUrl = imageUrlsToDisplay.length > 0
        ? imageUrlsToDisplay[0]
        : 'https://placehold.co/150x100/eeeeee/cccccc?text=No+Image';

    return (
        <Link to={`/posts/${post.id}`} className="post-card-link">
            <div className="post-card">
                <img src={imageUrl} alt={post.title} className="post-card-image" />
                <div className="post-card-content">
                    <h4>{post.title}</h4>
                    <p className="post-card-excerpt">{post.content.substring(0, 100)}...</p>
                    {/* createdAt 날짜를 대한민국 형식으로 표시 */}
                    <p className="post-card-meta">
                        작성자 ID: {post.userId} | {new Date(post.createdAt).toLocaleString('ko-KR')}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;