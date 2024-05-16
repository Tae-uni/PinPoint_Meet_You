/*import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearGroupData } from './store';
import { useNavigate } from 'react-router-dom';

function PageGet1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, limit, content } = useSelector(state => state.groupData);
  const [currentParticipants, setCurrentParticipants] = useState(0);

  const handleMapComponent = () => {
    navigate('/web');
  };

  const handleEndRecruitment = () => {
    setCurrentParticipants(0);
    alert('그룹설정을 종료하였습니다');
    dispatch(clearGroupData()); // Redux store에서 데이터 초기화
    navigate('/web');
  };

  const handleEditGroup = () => {
    setCurrentParticipants(0);
    navigate('/web/PageSet1');
  };

  return (
    <div>
      <h1>그룹 정보</h1>
      <p>제목: {title}</p>
      <p>인원 제한: {limit}</p>
      <p>현재 인원: {currentParticipants}</p>
      <p>그룹 내용: {content}</p>
      <button onClick={handleMapComponent}>지도로 가기</button>
      <button onClick={handleEndRecruitment}>그룹 인원 모집 종료</button>
      <button onClick={handleEditGroup}>그룹 정보 수정</button>
    </div>
  );
}

export default PageGet1; 

// PageGet1.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GroupDetail from './components/GroupDetail/GroupDetail';

const PageGet1 = () => {
    return (
            <Routes>
                <Route path=":groupId" element={<GroupDetail />} />
            </Routes>
    );
};

export default PageGet1; */
