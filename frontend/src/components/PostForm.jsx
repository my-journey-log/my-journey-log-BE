import React, { useState, useEffect } from 'react';
import './PostForm.css';

function PostForm({ initialData = {}, onSubmit, isEditMode = false, loading = false, error = null }) {

    const [userId, setUserId] = useState(initialData.userId != null ? String(initialData.userId) : '');
    const [placeId, setPlaceId] = useState(initialData.placeId != null ? String(initialData.placeId) : '');

    const [title, setTitle] = useState(initialData.title || '');
    const [content, setContent] = useState(initialData.content || '');
    const [images, setImages] = useState([]);
    const [existingImageUrls, setExistingImageUrls] = useState(initialData.imageUrls || []);

    useEffect(() => {
        if (isEditMode && initialData) {
            setUserId(initialData.userId != null ? String(initialData.userId) : '');
            setPlaceId(initialData.placeId != null ? String(initialData.placeId) : '');
            setTitle(initialData.title || '');
            setContent(initialData.content || '');
            setExistingImageUrls(initialData.imageUrls || []);
        }
    }, [initialData, isEditMode]);

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 입력해주세요.');
            return;
        }
        if (!userId.trim() || !placeId.trim() || isNaN(Number(userId)) || isNaN(Number(placeId))) {
            alert('사용자 ID와 장소 ID를 올바르게 입력해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('userId', Number(userId));
        formData.append('placeId', Number(placeId));
        formData.append('title', title);
        formData.append('content', content);


        images.forEach((image) => {
            formData.append('imageUrl', image);
        });

        onSubmit(formData);
    };

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <h3>{isEditMode ? '게시물 수정' : '새 게시물 작성'}</h3>
            <label>
                제목:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                />
            </label>
            <label>
                내용:
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="10"
                    disabled={loading}
                ></textarea>
            </label>
            <label>
                사용자 ID:
                <input
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    disabled={loading || isEditMode}
                />
            </label>
            <label>
                장소 ID:
                <input
                    type="number"
                    value={placeId}
                    onChange={(e) => setPlaceId(e.target.value)}
                    disabled={loading}
                />
            </label>
            <label>
                이미지 첨부:
                <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    accept="image/*"
                    disabled={loading}
                />
            </label>
            {existingImageUrls.length > 0 && (
                <div className="existing-images">
                    <h4>기존 이미지:</h4>
                    {existingImageUrls.map((url, index) => (
                        <img key={index} src={url} alt={`기존 이미지 ${index}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
                    ))}
                </div>
            )}
            {images.length > 0 && (
                <p>새로 선택된 이미지: {images.map(img => img.name).join(', ')}</p>
            )}
            <button type="submit" disabled={loading}>
                {loading ? '처리 중...' : (isEditMode ? '수정 완료' : '작성 완료')}
            </button>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
}

export default PostForm;