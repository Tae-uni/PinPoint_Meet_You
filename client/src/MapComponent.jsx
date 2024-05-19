/*import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const MapComponent = () => {
  const navigate = useNavigate();
  const [map, setMap] = useState(null); // 지도 객체 상태
  const [isApiLoaded, setIsApiLoaded] = useState(false); // API 로드 상태
  const groupData = useSelector(state => state.groupData); // Redux 상태에서 데이터 가져오기
  const places = [
    { name: "공대 앞 음식&술집", location: new window.kakao.maps.LatLng(36.5450810878513, 128.79467369649936) },
    { name: "가람관 앞 술집", location: new window.kakao.maps.LatLng(36.54338152187511, 128.79325255097558) },
    { name: "논골", location: new window.kakao.maps.LatLng(36.53997028426768, 128.7966016955334) },
    { name: "365", location: new window.kakao.maps.LatLng(36.54439617147981, 128.79468298427354) },
    { name: "이디야", location: new window.kakao.maps.LatLng(36.54367734575874, 128.79275410169018) },
    { name: "오커피하우스", location: new window.kakao.maps.LatLng(36.544919235783446, 128.7898571176661) },
    { name: "운동장", location: new window.kakao.maps.LatLng(36.54139019874927, 128.79325679493454) },
    { name: "학생회관", location: new window.kakao.maps.LatLng(36.54238263196865, 128.79825430990368) },
    { name: "종스센", location: new window.kakao.maps.LatLng(36.54164682030522, 128.80282656684997) }
  ];

  const handleLogIn = () => {
    navigate('/web/Login');
  };

  useEffect(() => {
    // Kakao 객체가 로드되었는지 확인
    const checkKakaoLoaded = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        setIsApiLoaded(true); // API가 로드되었음을 설정
        clearInterval(checkKakaoLoaded); // 인터벌 클리어
      }
    }, 100);

    // 인터벌 클리어
    return () => clearInterval(checkKakaoLoaded);
  }, []);

  useEffect(() => {
    if (!isApiLoaded) return; // API가 로드되지 않았으면 실행하지 않음

    // 지도 생성 및 설정
    const container = document.getElementById('map');
    if (!container) {
      console.error('Map container is not found.');
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(36.54202213174472, 128.79676643057186),
      level: 4
    };
    const newMap = new window.kakao.maps.Map(container, options);
    setMap(newMap);

    // 마커 생성 및 표시
    places.forEach(place => {
      const marker = new window.kakao.maps.Marker({
        position: place.location,
        map: newMap,
        title: place.name, // 마커에 이름 추가
      });

      // 커스텀 오버레이를 생성하여 마커 위에 이름 표시
      const content = document.createElement('div');
      content.className = 'marker-content';
      content.innerText = place.name;

      const overlay = new window.kakao.maps.CustomOverlay({
        content: content,
        position: place.location,
        map: newMap,
        yAnchor: 3,
      });

      // 클릭 이벤트 핸들러 등록
      window.kakao.maps.event.addListener(marker, 'click', () => {
        handleMarkerClick(place); // 클릭한 마커 정보를 처리하는 함수 호출
      });
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.kakao.maps.event.removeListener(newMap, 'click', handleMarkerClick);
    };
  }, [isApiLoaded]);

  // 클릭한 마커의 정보에 따라 페이지 이동 처리
  const handleMarkerClick = async (place) => {
    // PageSet에서 데이터 입력 여부 확인, 동적으로 URI을 찾아옴.
    try {
      const encodedPlaceName = encodeURIComponent(place.name);
      const response = await fetch(`/api/checkgroupdata/${encodedPlaceName}`);
      const data = await response.json();

      if (data.exists && data.title && data.maxParticipants && data.description) {
        navigate(`/web/PageGet/${encodedPlaceName}`);
      } else {
        navigate(`/web/PageSet/${encodedPlaceName}`);
      }
    } catch (error) {
      console.error('Error checking group data:', error);
    }
  };

  return (
    <div>
      <header>
        
      </header>
      <div id="map" style={{ width: '1080px', height: '2220px' }}></div>
    </div>
  );
};

export default MapComponent; */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import logo from '../Logo.png'; // 로고 이미지 경로를 적절히 변경하세요

const MapComponent = () => {
  const navigate = useNavigate();
  const [map, setMap] = useState(null); // 지도 객체 상태
  const [isApiLoaded, setIsApiLoaded] = useState(false); // API 로드 상태
  const groupData = useSelector(state => state.groupData); // Redux 상태에서 데이터 가져오기
  const places = [
    { name: "공대 앞 음식&술집", location: new window.kakao.maps.LatLng(36.5450810878513, 128.79467369649936) },
    { name: "가람관 앞 술집", location: new window.kakao.maps.LatLng(36.54338152187511, 128.79325255097558) },
    { name: "논골", location: new window.kakao.maps.LatLng(36.53997028426768, 128.7966016955334) },
    { name: "365", location: new window.kakao.maps.LatLng(36.54439617147981, 128.79468298427354) },
    { name: "이디야", location: new window.kakao.maps.LatLng(36.54367734575874, 128.79275410169018) },
    { name: "오커피하우스", location: new window.kakao.maps.LatLng(36.544919235783446, 128.7898571176661) },
    { name: "운동장", location: new window.kakao.maps.LatLng(36.54139019874927, 128.79325679493454) },
    { name: "학생회관", location: new window.kakao.maps.LatLng(36.54238263196865, 128.79825430990368) },
    { name: "종스센", location: new window.kakao.maps.LatLng(36.54164682030522, 128.80282656684997) }
  ];

  const handleLogIn = () => {
    navigate('/web/Login');
  };

  useEffect(() => {
    // Kakao 객체가 로드되었는지 확인
    const checkKakaoLoaded = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        setIsApiLoaded(true); // API가 로드되었음을 설정
        clearInterval(checkKakaoLoaded); // 인터벌 클리어
      }
    }, 100);

    // 인터벌 클리어
    return () => clearInterval(checkKakaoLoaded);
  }, []);

  useEffect(() => {
    if (!isApiLoaded) return; // API가 로드되지 않았으면 실행하지 않음

    // 지도 생성 및 설정
    const container = document.getElementById('map');
    if (!container) {
      console.error('Map container is not found.');
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(36.54202213174472, 128.79676643057186),
      level: 4
    };
    const newMap = new window.kakao.maps.Map(container, options);
    setMap(newMap);

    // 마커 생성 및 표시
    places.forEach(place => {
      const marker = new window.kakao.maps.Marker({
        position: place.location,
        map: newMap,
        title: place.name, // 마커에 이름 추가
      });

      // 커스텀 오버레이를 생성하여 마커 위에 이름 표시
      const content = document.createElement('div');
      content.className = 'marker-content';
      content.innerText = place.name;

      const overlay = new window.kakao.maps.CustomOverlay({
        content: content,
        position: place.location,
        map: newMap,
        yAnchor: 3,
      });

      // 클릭 이벤트 핸들러 등록
      window.kakao.maps.event.addListener(marker, 'click', () => {
        handleMarkerClick(place); // 클릭한 마커 정보를 처리하는 함수 호출
      });
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.kakao.maps.event.removeListener(newMap, 'click', handleMarkerClick);
    };
  }, [isApiLoaded]);

  // 클릭한 마커의 정보에 따라 페이지 이동 처리
  const handleMarkerClick = async (place) => {
    // PageSet에서 데이터 입력 여부 확인, 동적으로 URI을 찾아옴.
    try {
      const encodedPlaceName = encodeURIComponent(place.name);
      const response = await fetch(`/api/checkgroupdata/${encodedPlaceName}`);
      const data = await response.json();

      if (data.exists && data.title && data.maxParticipants && data.description) {
        navigate(`/web/PageGet/${encodedPlaceName}`);
      } else {
        navigate(`/web/PageSet/${encodedPlaceName}`);
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
        //boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
      }}>
        <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px', marginTop: '10px' }} />
        <input
          type="text"
          placeholder="Search places..."
          style={{ width: '300px', padding: '12px', borderRadius: '10px', borderStyle: 'none', marginTop: '10px'}}
        />
      </header>
      <div id="map" style={{ width: '100%', height: '100%'}}></div>
    </div>
  );
};

export default MapComponent;
