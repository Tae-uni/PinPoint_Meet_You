import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './update.css';
import logo from '../Login/logLogo.png'

const UpdateGroup = () => {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const [title, setTitle] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [placeName, setPlaceName] = useState('');

    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                const response = await fetch(`/api/groups/${groupId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTitle(data.title);
                setMaxParticipants(data.maxParticipants);
                setDescription(data.description);
                setPlaceName(data.placeName);
            } catch (error) {
                console.error('Error fetching group data:', error);
            }
        };

        fetchGroupData();
    }, [groupId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('maxParticipants', maxParticipants);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`/api/groups/${groupId}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to update group');
            }

            alert('성공적으로 업데이트 되었습니다!');

            navigate(`/web/PageGet/${encodeURIComponent(placeName)}`);
        } catch (error) {
            console.error('Error updating group:', error);
        }
    };

    const handleGetpage = () => {
        navigate(`/web/PageGet/${encodeURIComponent(placeName)}`);
    }

    return (
        <div className='container-update'>
            <div className='form-update'>
                <h2 className='h2-update'>{title}</h2>수정페이지
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className='logo-update'>
                        <img src={logo} alt="Logo" className='logo-img-update' />
                    </div>
                    <div className='update-con'>
                        그룹제목
                        <input className='group-update' type="text" value={title} onChange={(e) => setTitle(e.target.value)} required  />
                    </div>
                    <div className='update-con'>
                        이미지 업로드
                        <input className='group-update' type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className='update-con'>
                        인원 제한
                        <input className='group-update' type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} required />
                    </div>
                    <div className='update-con'>
                        세부정보
                        <textarea className='update-textarea' value={description} onChange={(e) => setDescription(e.target.value)} required placeholder='어떤 그룹 활동을 진행할 예정인지 설명해주세요'></textarea>
                    </div>
                    <div className='final-btn-update'>
                        <button onClick={handleGetpage} className='cancel-button-update'>취소</button>
                        <button type="submit" className='final-button-update'>업데이트</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateGroup;
