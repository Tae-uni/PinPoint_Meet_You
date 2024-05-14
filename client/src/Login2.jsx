import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

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
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div className="blo">
          <label htmlFor="email">이메일</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="blo">
          <label htmlFor="password">비밀번호</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <input type="submit" value="로그인" />
      </form>
      <br /><br />
      <button onClick={handleSignup}>회원가입</button>
    </div>
  );
}

export default Login;

