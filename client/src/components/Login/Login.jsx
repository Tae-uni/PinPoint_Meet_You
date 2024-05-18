import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./style.css";
import logLogo from './logLogo.png';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleSignup = () => {
    navigate('/web/Signup');
  };

  const handleGroup = () => {
    navigate('/web2');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const HorizonLine = ({ text }) => {
    return (
      <div
        style={{
          width: "100%",
          textAlign: "center",
          borderBottom: "1px solid #aaa",
          lineHeight: "0.1em",
          margin: "30px 0 20px",
          fontSize: "14px",
        }}
      >
        <span style={{ background: "#fff", padding: "0 10px" }}>{text}</span>
      </div>
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        // 로그인 성공 처리
        setMessage('Login Success!');
        navigate('/web');
      } else {
        // 로그인 실패 처리
        setMessage('Login Fail!');
      }
    } catch (error) {
      // 네트워크 오류 처리
      setMessage('Network Error');
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <img src={logLogo} alt="Logo" className="logo-image" />
      </div>
      <form onSubmit={handleLogin}>
        <div className='form'>
          <input type="text" name="email" placeholder='이메일을 입력하세요' value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder='비밀번호를 입력하세요' value={formData.password} onChange={handleChange} />
          <button className="login-button" onClick={handleLogin} >로그인</button>
          <div className="link-buttons">
            <button className="link-button">아이디 찾기</button>
            <button className="link-button">비밀번호 찾기</button>
          </div>
          <HorizonLine text="OR" />
          <div className="footer">
            <div className="button-container">
              <button className="sign-up-button" onClick={handleSignup}>회원가입</button>
              <button className="rounded-button" onClick={handleGroup}>그룹찾기</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;