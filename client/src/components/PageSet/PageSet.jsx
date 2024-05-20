// PageSet.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PageSet.css'
import logo from '../Login/logLogo.png'

const PageSet = () => {
    const { placeName } = useParams(); // Get placeName from URL parameters
    const navigate = useNavigate();
    // 'useState' is used for controlling or managing state in React.
    const [title, setTitle] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData();
        formData.append('title', title);
        formData.append('maxParticipants', maxParticipants);
        formData.append('currentParticipants', 0);
        formData.append('description', description);
        formData.append('placeName', placeName);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch('/api/groups', {
                // modern way to make HTTP requests in JS. In this case, to server's routes.js
                method: 'POST', // HTTP POST request
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to create group');
            }
            
            alert('그룹이 생성되었습니다');
            navigate(`/web/PageGet/${encodeURIComponent(placeName)}`);
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    const handleMapComponent = () => {
        navigate('/web');
    };

    return (
        <div className='container-pageset'>
            <div className='form-pageset'>
                <h2>{placeName}</h2>
                그룹 생성 페이지
                <form onSubmit={handleSubmit}>
                    <div className='logo-pageset'>
                        <img src={logo} alt="Logo" className='logo-img-pageset' />
                    </div>
                    <div className='groupset-con'>
                        그룹제목
                        <input className='groupinfo' type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder='그룹의 제목을 입력해주세요' />
                    </div>
                    <div className='groupset-con'>
                        이미지 업로드
                        <input className='groupinfo' type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className='groupset-con'>
                        인원 제한
                        <input className='groupinfo' type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} required placeholder='최대 참여 가능한 인원 수를 입력해주세요' />
                    </div>
                    <div className='groupset-con'>
                        세부정보
                        <textarea className='groupset-textarea' value={description} onChange={(e) => setDescription(e.target.value)} required placeholder='어떤 그룹 활동을 진행할 예정인지 설명해주세요'></textarea>
                    </div>
                    <div className='final-btn-pageset'>
                        <button onClick={handleMapComponent} className='cancel-button-pageset'>취소</button>
                        <button type="submit" className='final-button-pageset'>완료</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PageSet;

/*<div className='container'>
<div className='form'></div>
    <h1>{placeName} 데이터 설정 페이지</h1>
    <form onSubmit={handleSubmit}>
        <label>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <br />
        <label>
            Upload Image:
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <br />
        <label>
            Max Participants:
            <input type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} required />
        </label>
        <br />
        <label>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </label>
        <br />
        <button onClick={handleMapComponent}>지도로 가기</button>
        <button type="submit">Submit</button>
    </form>
</div> */