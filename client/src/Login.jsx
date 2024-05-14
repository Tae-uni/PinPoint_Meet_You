import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./style.css";

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
  <div className="status-bar">
    <div className="time">9:41</div>
    <div className="status-icons"></div>
  </div>
  <div className="logo">
  <img src="Logo.png" alt="Logo" className="logo-image"/> 
  </div>
  <form onSubmit={handleLogin}>
    <div className='form'>
      <label htmlFor="email">이메일</label>
      <input type="text" name="email" value={formData.email} onChange={handleChange} />
      <label htmlFor="password">비밀번호</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} />
      <div className="link-buttons">
        <button className="link-button" onClick={handleLogin} >로그인</button>
        <button className="link-button" onClick={handleSignup}>회원가입</button>
      </div>
      <div className="footer">
        <span className="title">
          <button className="rounded-button" onClick={handleGroup}>그룹찾기</button>
        </span>
      </div>
    </div>
  </form>
</div>
  );
}

export default Login;