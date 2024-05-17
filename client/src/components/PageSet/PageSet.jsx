// PageSet.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PageSet = () => {
    const { placeName } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    maxParticipants,
                    description,
                    placeName,
                    currentParticipants: 0
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create group');
            }

            navigate(`/web/PageGet/${encodeURIComponent(placeName)}`);
        } catch (error) {
            console.error('Error creating group:', error);
        }
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
                    Max Participants:
                    <input type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} required />
                </label>
                <br />
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PageSet;
