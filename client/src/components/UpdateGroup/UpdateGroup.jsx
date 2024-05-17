import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

            navigate(`/web/PageGet/${encodeURIComponent(placeName)}`);
        } catch (error) {
            console.error('Error updating group:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
            <h1>Update Group</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <br />

                <label htmlFor="maxParticipants">Max Participants:</label>
                <input
                    type="number"
                    id="maxParticipants"
                    name="maxParticipants"
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(e.target.value)}
                    required
                />
                <br />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <br />

                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <br />

                <button type="submit">Update Group</button>
            </form>
            <button onClick={() => navigate(`/web/PageGet/${encodeURIComponent(placeName)}`)}>Cancel</button>
        </div>
    );
};

export default UpdateGroup;
