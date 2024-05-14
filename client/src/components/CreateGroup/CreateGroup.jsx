import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const CreateGroup = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [maxParticipants, setMaxParticipants] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleImageChange = (e) => setImage(e.target.files[0]);
    const handleMaxParticipantsChange = (e) => setMaxParticipants(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('maxParticipants', maxParticipants);
        formData.append('description', description);

        try {
            const response = await fetch('/api/groups', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // 그룹이 생성된 후, 생성된 그룹의 상세 페이지로 이동합니다.
            // window.location.href = `/groups/${data.group._id}`;
            navigate("/web/PageGet1");
        } catch (error) {
            console.error('Failed to create group', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
            <h1>Create Group Page</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="title">Group Title:</label>
                <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} required /><br />

                <label htmlFor="image">Upload Image:</label>
                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} /><br />

                <label htmlFor="maxParticipants">Maximum maxParticipants:</label>
                <input type="number" name="maxParticipants" id="maxParticipants" value={maxParticipants} onChange={handleMaxParticipantsChange} /><br />

                <label htmlFor="description">Description:</label>
                <textarea name="description" id="description" value={description} onChange={handleDescriptionChange} required></textarea><br />

                <button type="submit">Create Group</button>
            </form>
        </div>
    );
};

export default CreateGroup;
