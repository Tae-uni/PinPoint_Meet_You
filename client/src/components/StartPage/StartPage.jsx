import React from 'react';
import { useNavigate } from 'react-router-dom';
import './startPage.css';
import logo from './LOGO.png';

const StartPage = () => {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/login');
    }

    return (
        <div className="outer-container-start">
            <div className="white-container-start">
                <div className="logo-start">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="footer-start">
                    <button className="rounded-button-start" onClick={handleStartClick}>시작하기</button>
                </div>
            </div>
        </div>
    );
};

export default StartPage;
