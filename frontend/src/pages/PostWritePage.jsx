import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { createPost, updatePost, getPostDetail } from '../api/postApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function PostWritePage() {
    const { id } = useParams(); // URL에 ID가 있으면 수정 모드
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);
    const [initialData, setInitialData] = useState(null); // 초기에는 null로 설정
    const [loading, setLoading] = useState(true); // 초기 로딩 상태
    const [error, setError] = useState(null);

    const currentUserId = 1; // 예시 사용자 ID (TODO: 실제 로그인된 사용자 ID로 변경)

    useEffect(() => {
        if (id) { // ID가 있으면 수정 모드
            setIsEditMode(true);
            const fetchPostData = async () => {
                try {
                    const data = await getPostDetail({ id: Number(id) });
                    // Post 엔티티에서 PostForm에 필요한 형식으로 데이터 변환
                    const transformedData = {
                        id: data.id,
                        userId: data.userId,
                        placeId: data.placeId,
                        title: data.title,
                        content: data.content,
                        imageUrls: data.imageFieldName ? data.imageFieldName.split(',').map(filename => `http://localhost:8080/files/${filename.trim()}`) : [],
                    };
                    setInitialData(transformedData);
                } catch (err) {
                    setError('게시물 데이터를 불러오는데 실패했습니다.');
                } finally {
                    setLoading(false);
                }
            };
            fetchPostData();
        } else { // ID가 없으면 생성 모드
            setIsEditMode(false);
            setLoading(false);
            setInitialData({}); // <-- 중요: 생성 모드일 때 initialData를 빈 객체로 초기화
        }
    }, [id]); // id가 변경될 때마다 useEffect 재실행

    const handleSubmit = async (formData) => {
        setLoading(true);
        setError(null);

        // userId, placeId는 PostForm에서 이미 formData에 추가되도록 수정되었으므로 여기서는 추가하지 않음
        // PostForm에서 userId와 placeId를 상태로 관리하고 formData에 추가해야 합니다.

        try {
            if (isEditMode) {
                formData.append('id', id);
                await updatePost(formData);
                alert('게시물이 성공적으로 수정되었습니다!');
            } else {
                await createPost(formData);
                alert('게시물이 성공적으로 작성되었습니다!');
            }
            navigate('/posts');
        } catch (err) {
            console.error('게시물 저장/수정 실패:', err);
            setError('게시물 저장/수정 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // initialData가 null이거나 (수정 모드에서 데이터 로딩 중),
    // 또는 로딩 중일 때 로딩 스피너를 보여줍니다.
    if (loading || (isEditMode && initialData === null)) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div className="post-write-page">
            <PostForm
                initialData={initialData} // 이제 initialData는 항상 객체이거나 null이 아님
                onSubmit={handleSubmit}
                isEditMode={isEditMode}
                loading={loading}
                error={error}
            />
        </div>
    );
}

export default PostWritePage;