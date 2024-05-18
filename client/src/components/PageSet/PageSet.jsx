// PageSet.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
                /*headers: {
                    'Content-Type': 'application/json', // Set request body type to JSON
                },*/
                body: formData
                /*JSON.stringify({ // Information that I want.
                    title,
                    image,
                    maxParticipants,
                    description,
                    placeName,
                    currentParticipants: 0
                }),*/
            });

            if (!response.ok) {
                throw new Error('Failed to create group');
            }

            navigate(`/web/PageGet/${encodeURIComponent(placeName)}`);
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };
    
    const handleMapComponent = () => {
        navigate('/web');
    };

    return (
        <div>
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
        </div>
    );
};

export default PageSet;
