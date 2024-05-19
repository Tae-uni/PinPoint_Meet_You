/*import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function UserPageGet() {
  const navigate = useNavigate();
  const { placeName } = useParams();
  const decodedPlaceName = decodeURIComponent(placeName);
  //const { title, limit, content } = useSelector(state => state.groupData);
  //const [currentParticipants, setCurrentParticipants] = useState(0);
  const [groupData, setGroupData] = useState(null);
  const [isJoined, setIsJoined] = useState(false);


  /*const handleJoinGroupC = () => {
    if (currentParticipants < limit) {
      setCurrentParticipants(currentParticipants + 1);
      setIsJoined(true);
      sessionStorage.setItem('isJoined', 'true');
      //alert('그룹에 참여하셨습니다. 현재 참여 인원: ' + (currentParticipants + 1));
    } else {
      //alert('그룹 인원 제한을 초과하여 참여할 수 없습니다.');
    }
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
        setIsJoined(true); // 그룹 참여 상태 업데이트
        sessionStorage.setItem('isJoined', 'true');
        //window.location.reload();
        alert('그룹에 참가 했습니다.');
      } catch (error) {
        console.error('Error joining group:', error);
      }
    } else {
      alert('최대 참가 인원에 도달했습니다.');
    }
  };

  const handleGroup = () => {
    navigate('/web2');
  };

  const handleReview = () => {
    navigate('/web/ReviewPage');
  };

  const handleReviewGet = () => {
    navigate('/web/ReviewGet');
  };

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await fetch(`/api/checkgroupdata/${encodeURIComponent(decodedPlaceName)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!data) {
          throw new Error('No group data found');
        }
        setGroupData(data);

        const storedIsJoined = sessionStorage.getItem('isJoined');
        if (storedIsJoined === 'true') {
          setIsJoined(true);
        }

      } catch (error) {
        console.error('Error fetching group data or checking join status:', error);
      }
    };

    fetchGroupData();
  }, [decodedPlaceName]);

  if (!groupData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>그룹 정보</h1>
      <p>제목: {groupData.title}</p>
      <p>인원 제한: {groupData.maxParticipants}</p>
      <p>그룹 내용: {groupData.description}</p>
      <p>현재 인원: {groupData.currentParticipants}</p>
      {!isJoined && <button onClick={handleJoinGroup}>그룹 참여하기</button>}
      {isJoined && (
        <>
          <button onClick={handleReview}>리뷰 작성하기</button>
          <button onClick={handleReviewGet}>리뷰 목록 보기</button>
        </>
      )}
      <button onClick={handleGroup}>다른 그룹 찾으러가기</button>
    </div>
  );
}

export default UserPageGet; */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserPageGet() {
  const navigate = useNavigate();
  const { placeName } = useParams();
  const decodedPlaceName = decodeURIComponent(placeName);
  const [groupData, setGroupData] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

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
        const updatedGroup = await response.json();
        setGroupData(updatedGroup);
        sessionStorage.setItem('isJoined', 'true');
        alert('그룹에 참가 했습니다.');
      } catch (error) {
        console.error('Error joining group:', error);
      }
    } else {
      alert('최대 참가 인원에 도달했습니다.');
    }
  };

  const handleGroup = () => {
    navigate('/web2');
  };

  const handleReview = () => {
    navigate('/web/ReviewPage');
  };

  const handleReviewGet = () => {
    navigate(`/web/ReviewGet/${encodeURIComponent(placeName)}`);
  };

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await fetch(`/api/checkgroupdata/${encodeURIComponent(decodedPlaceName)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!data) {
          throw new Error('No group data found');
        }
        setGroupData(data);

        const storedIsJoined = sessionStorage.getItem('isJoined');
        if (storedIsJoined === 'true') {
          setIsJoined(true);
        }

      } catch (error) {
        console.error('Error fetching group data or checking join status:', error);
      }
    };

    fetchGroupData();
  }, [decodedPlaceName]);

  if (!groupData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>그룹 정보</h1>
      <p>제목: {groupData.title}</p>
      <p>인원 제한: {groupData.maxParticipants}</p>
      <p>그룹 내용: {groupData.description}</p>
      <p>현재 인원: {groupData.currentParticipants}</p>
      {!isJoined && <button onClick={handleJoinGroup}>그룹 참여하기</button>}
      {isJoined && (
        <>
          <button onClick={handleReview}>리뷰 작성하기</button>
          <button onClick={handleReviewGet}>리뷰 목록 보기</button>
        </>
      )}
      <button onClick={handleGroup}>다른 그룹 찾으러가기</button>
    </div>
  );
}

export default UserPageGet;