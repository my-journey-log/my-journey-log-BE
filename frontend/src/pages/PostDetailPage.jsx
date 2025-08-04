import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostDetail, deletePost } from '../api/postApi'; // getPostDetail 임포트 (백엔드에 맞춰 POST)
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function PostDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const requestData = { id: Number(id) };
                const data = await getPostDetail(requestData);
                setPost(data);
            } catch (err) {
                setError('게시물 상세 정보를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
            setDeleting(true);
            try {
                await deletePost(id);
                alert('게시물이 삭제되었습니다.');
                navigate('/posts');
            } catch (err) {
                setError('게시물 삭제에 실패했습니다.');
            } finally {
                setDeleting(false);
            }
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!post) {
        return <p>게시물을 찾을 수 없습니다.</p>;
    }

    const imageUrlsToDisplay = post.imageUrls || [];

    return (
        <div className="post-detail-page">
            <h2>{post.title}</h2>
            {/* createdAt 날짜 형식 변경 */}
            <p className="post-meta">작성자 ID: {post.userId} | 장소 ID: {post.placeId} | {new Date(post.createdAt).toLocaleString('ko-KR')}</p>
            <div className="post-content">
                <p>{post.content}</p>
                {imageUrlsToDisplay.length > 0 && (
                    <div className="post-images">
                        {imageUrlsToDisplay.map((url, index) => (
                            <img key={index} src={url} alt={`게시물 이미지 ${index + 1}`} className="post-detail-image" />
                        ))}
                    </div>
                )}
            </div>
            <div className="post-actions">
                <Link to={`/posts/${post.id}/edit`} className="button">수정</Link>
                <button onClick={handleDelete} disabled={deleting}>
                    {deleting ? '삭제 중...' : '삭제'}
                </button>
                <Link to="/posts" className="button">목록으로</Link>
            </div>
        </div>
    );
}

export default PostDetailPage;