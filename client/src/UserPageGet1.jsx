import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearGroupData } from './store';
import { useNavigate } from 'react-router-dom';

function UserPageGet1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, limit, content } = useSelector(state => state.groupData);
  // 현재 인원 상태
  const [currentParticipants, setCurrentParticipants] = React.useState(0);

  // 그룹 참여 핸들러
  const handleJoinGroup = () => {
    if (currentParticipants < limit) {
      setCurrentParticipants(currentParticipants + 1);
      alert('그룹에 참여하셨습니다. 현재 참여 인원: ' + (currentParticipants + 1));
    } else {
      alert('그룹 인원 제한을 초과하여 참여할 수 없습니다.');
    }
  };
  
  const handleGroup = () => {
    navigate('/web2');
  }
  return (
    <div>
      <h1>그룹 정보</h1>
      <p>제목: {title}</p>
      <p>인원 제한: {limit}</p>
      <p>그룹 내용: {content}</p>
      <p>현재 인원: {currentParticipants}</p>
      <button onClick={handleJoinGroup}>그룹 참여하기</button>
      <button onClick={handleGroup}>다른 그룹 찾으러가기</button>
    </div>
  );
}

export default UserPageGet1;