/*// PageGet.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PageGet = () => {
    const { placeName } = useParams();
    const [groupData, setGroupData] = useState(null);

    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                const response = await fetch(`/api/checkgroupdata/${placeName}`);
                const data = await response.json();
                setGroupData(data);
            } catch (error) {
                console.error('Error fetching group data:', error);
            }
        };

        fetchGroupData();
    }, [placeName]);

    if (!groupData) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{groupData.title}</h1>
            <p>Max Participants: {groupData.maxParticipants}</p>
            <p>Description: {groupData.description}</p>
        </div>
    );
};

export default PageGet; */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PageGet = () => {
  const { placeName } = useParams();
  const decodedPlaceName = decodeURIComponent(placeName); // URL 디코딩
  const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await fetch(`/api/checkgroupdata/${placeName}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGroupData(data);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchGroupData();
  }, [placeName]);

  if (!groupData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{groupData.title}</h1>
      <p>Max Participants: {groupData.maxParticipants}</p>
      <p>Description: {groupData.description}</p>
    </div>
  );
};

export default PageGet;

