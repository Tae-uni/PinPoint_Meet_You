import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // 필요한 경우 컴포넌트 전용 CSS 파일을 사용
import logo from './LOGO.png';

const StartPage = () => {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/login');
    }

    return (
        <div className="outer-container">
            <div className="white-container">
                <div className="logo">
                    <img src={logo} alt="Logo" className="logo-image" />
                </div>
                <div className="footer">
                    <span className="title">
                        <button className="rounded-button" onClick={handleStartClick}>시작하기</button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StartPage;
