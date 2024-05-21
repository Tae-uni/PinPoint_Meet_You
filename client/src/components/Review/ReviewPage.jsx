import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../../store';
import { useNavigate } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import PropTypes from 'prop-types';
import Rprofile from './profile1.png'
import './Review.css';

function ReviewPage() {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReview = () => {
    if (rating === 0 || review.trim() === '') {
      alert('별점과 후기를 모두 작성해주세요.');
      return;
    }

    dispatch(addReview({ rating, review }));
    setRating(0);
    setReview('');
    alert('후기가 등록되었습니다.');
    navigate('/web/ReviewGet'); // 후기 목록 페이지로 이동
  };

  const handleCancel = () => {
    setRating(0);
    setReview('');
    navigate(-1); // 원래 페이지로 이동
  };


  return (
    <div>
      <div className='container-review'>
        <h1 className='title'>리뷰 작성</h1>
        <div>
          <img src={Rprofile} alt="Profile" className="profile-image" />
        </div>
        <div className='review-group'>
          <div className='title-name'>
            <h3>작성자: Jonnie</h3>
          </div>
          <div className='star'>
            <ReactStars
              count={5}
              size={24}
              activeColor="#ffd700"
              value={rating}
              onChange={newRating => setRating(newRating)}
            />
          </div>
          <h4 className='attend'>그룹 참여 후기</h4>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="후기를 적어주세요."
            rows="7"
            cols="50" />
        </div>
        <div className="btn">
          <button
            className="final-button-userg"
            onClick={handleReview}
          >
            후기등록
          </button>
          <button
            className="cancel-button-userg"
            style={{ marginTop: '10px' }}
            onClick={handleCancel}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

ReviewPage.propTypes = {
  addReview: PropTypes.func
};

export default ReviewPage; 