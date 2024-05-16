/*import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setGroupData } from './store';

function PageSet1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [limit, setLimit] = useState('');
  const [content, setContent] = useState('');
  

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };  

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Set data in Redux store
    dispatch(setGroupData({ title, limit, content }));

    // Navigate to appropriate pages
    navigate('/UserPageGet1', { state: { title, limit, content } });
    navigate('/web/PageGet1', { state: { title, limit, content } });
  };

  const handleCancel = () => {
    navigate('/web');
  };

  return (
    <div>
      <h1>그룹 설정</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="limit">인원 제한:</label>
          <input
            id="limit"
            type="number"
            value={limit}
            onChange={handleLimitChange}
          />
        </div>
        <div>
          <label htmlFor="content">그룹 내용:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <button type="button" onClick={handleCancel}>취소</button>
        <button type="submit" name="submit">제출</button>
      </form>
    </div>
  );
}

export default PageSet1; 

import React from 'react';
import CreateGroup from './components/CreateGroup/CreateGroup';
const PageSet1 = () => {
    return (
        <div>
            <CreateGroup />
        </div>
    );
};

export default PageSet1;
*/