// GroupDetail.jsx
/*import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GroupDetail = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const response = await fetch(`/api/groups/${groupId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch group details');
                }
                const data = await response.json();
                setGroup(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGroupDetails();
    }, [groupId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>{group.title}</h1>
            <img src={group.pic} alt={group.title} style={{ width: '300px', height: '300px' }} />
            <p>{group.description}</p>
            <p>Max Participants: {group.maxParticipants}</p>
            <p>Current Participants: {group.currentParticipants}</p>
            <p>Status: {group.isFull ? 'Full' : 'Open'}</p>
        </div>
    );
};

export default GroupDetail; */
