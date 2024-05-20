import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './pageGet.css';
import logo from '../Login/logLogo.png'

const PageGet = () => {
  const { placeName } = useParams();
  const decodedPlaceName = decodeURIComponent(placeName);
  const [groupData, setGroupData] = useState(null);
  const navigate = useNavigate();

  const handleMapComponent = () => {
    navigate('/web');
  };

  const handleEditGroup = () => {
    if (!groupData) {
      console.error('groupData is undefined');
      return;
    }
    navigate(`/groups/${groupData._id}/edit`);
  };

  const handleJoinGroup = async () => {
    if (!groupData) {
      console.error('groupData is undefined');
      return;
    }

    if (groupData.currentParticipants < groupData.maxParticipants) {
      try {
        const response = await fetch(`/api/groups/${groupData._id}/participants`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to join group');
        }
        const updatedGroup = await response.json(); // 응답에서 업데이트된 그룹 데이터를 가져옴
        setGroupData(updatedGroup);
        window.location.reload();
        alert('그룹에 참가 했습니다.');
      } catch (error) {
        console.error('Error joining group:', error);
      }
    } else {
      alert('최대 참가 인원에 도달했습니다.');
    }
  };

  const handleEndRecruitment = async () => {
    if (!groupData) {
      console.error('groupData is undefined');
      return;
    }

    try {
      const response = await fetch(`/api/groups/${groupData._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete group');
      }
      alert('그룹이 삭제되었습니다');
      navigate('/web');
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await fetch(`/api/checkgroupdata/${decodedPlaceName}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!data) {
          throw new Error('No group data found');
        }
        setGroupData(data);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchGroupData();
  }, [decodedPlaceName]);

  if (!groupData) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container-pageget'>
      <h1 className='h1-get'>{groupData.title}</h1>
      <div className='form-pageget'>
        <div className='logo'>
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        {/*{groupData.image && (
          <div className='image-container'>
            <img src={groupData.image} alt='Picture' />
          </div>
        )}*/}
        <div className='input-group-pageget'>
          <div className='pageget-con'>
            <p>현재 참여자 수: {groupData.currentParticipants}</p>
          </div>
          <div className='pageget-con'>
            <p>최대 참여자 수: {groupData.maxParticipants}</p>
          </div>
          <div className='pageget-con'>
            세부정보 <p className='detail-groupget'>{groupData.description}</p>
          </div>
        </div>
        <div className='btn-container-pageget'>
          <button onClick={handleMapComponent} className='btn-pageget'>지도로 가기</button>
          <button onClick={handleEditGroup} className='btn-pageupdate'>그룹 정보 수정</button>
          {/*<button onClick={handleJoinGroup} className='btn-pageget'>그룹 참가</button>*/}
          <button onClick={handleEndRecruitment} className='btn-pageend'>모집 종료</button>
        </div>
      </div>
    </div>
  );
};

export default PageGet;

