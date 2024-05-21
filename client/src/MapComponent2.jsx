import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const { kakao } = window;
import { useSelector } from 'react-redux';
import logo from '../Logo.png'; 


function MapComponent2() {
  const navigate = useNavigate();
  const location = useLocation();
  const groupData = useSelector(state => state.groupData); // Redux 상태에서 데이터 가져오기
  const [map, setMap] = useState(null); // 지도 객체 상태
  const places = [
    { name: "공대 앞 음식&술집", location: new kakao.maps.LatLng(36.5450810878513, 128.79467369649936) },
    { name: "가람관 앞 술집", location: new kakao.maps.LatLng(36.54338152187511, 128.79325255097558) },
    { name: "논골", location: new kakao.maps.LatLng(36.53997028426768, 128.7966016955334) },
    { name: "365", location: new kakao.maps.LatLng(36.54439617147981, 128.79468298427354) },
    { name: "이디야", location: new kakao.maps.LatLng(36.54367734575874, 128.79275410169018) },
    { name: "오커피하우스", location: new kakao.maps.LatLng(36.544919235783446, 128.7898571176661) },
    { name: "운동장", location: new kakao.maps.LatLng(36.54139019874927, 128.79325679493454) },
    { name: "학생회관", location: new kakao.maps.LatLng(36.54238263196865, 128.79825430990368) },
    { name: "종스센", location: new kakao.maps.LatLng(36.54164682030522, 128.80282656684997) }
  ];
  
  const handleLogoClick = () => {
    navigate('/web');
  };

  useEffect(() => {
    // 지도 생성 및 설정
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(36.54202213174472, 128.79676643057186),
      level: 4
    };
    const newMap = new kakao.maps.Map(container, options);
    setMap(newMap);

    // 마커 생성 및 표시
    places.forEach(place => {
      const marker = new kakao.maps.Marker({
        position: place.location,
        map: newMap,
        title: place.name, // 마커에 이름 추가
      });

      // 커스텀 오버레이를 생성하여 마커 위에 이름 표시
      const content = document.createElement('div');
      content.className = 'marker-content';
      content.innerText = place.name;

      const overlay = new kakao.maps.CustomOverlay({
        content: content,
        position: place.location,
        map: newMap,
        yAnchor: 3,
      });

      // 클릭 이벤트 핸들러 등록
      kakao.maps.event.addListener(marker, 'click', function () {
        handleMarkerClick(place); // 클릭한 마커 정보를 처리하는 함수 호출
      });
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      kakao.maps.event.removeListener(newMap, 'click', handleMarkerClick);
    };
  }, []);

  // 클릭한 마커의 정보에 따라 페이지 이동 처리
  const handleMarkerClick = async (place) => {
    try {
      const encodedPlaceName = encodeURIComponent(place.name);
      const response = await fetch(`/api/checkgroupdata/${encodedPlaceName}`);
      const data = await response.json();

      if (data.exists && data.title && data.maxParticipants && data.description) {
        navigate(`/web/UserPageGet/${encodedPlaceName}`);
      } else {
        alert("만들어진 그룹이 없습니다!");
      }
    } catch (error) {
      console.error('Error checking group data:', error);
    }
  };

  return (
    <div style={{ position: 'relative', width: '1080px', height: '100vh' }}>
      <header style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        backgroundColor: 'transparent',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 20px',
      }}>
        <img src={logo} alt="Logo" onClick={handleLogoClick} style={{ height: '40px', marginRight: '10px', marginTop: '10px', border: 'solid, red, 1px', borderRadius: '10px'}} />
        <input
          type="text"
          placeholder="로그인 후 이용가능 합니다."
          style={{ width: '300px', padding: '12px', borderRadius: '10px', marginTop: '10px', border: 'solid, red, 1px' }}
        />
      </header>
      <div id="map" style={{ width: '100%', height: '100%', border: 'solid; red; 1px' }}></div>
    </div>
  );
}

export default MapComponent2;