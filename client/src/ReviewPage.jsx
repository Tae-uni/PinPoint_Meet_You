import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from './store';
import { useNavigate } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import PropTypes from 'prop-types';

function ReviewPage() {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    dispatch(addReview({ review, rating }));
    alert('리뷰와 별점이 저장되었습니다.');
    navigate('/web/ReviewGet');
  };

  return (
    <div>
      <h1>리뷰 작성하기</h1>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="후기를 적어주세요."
          rows="4"
          cols="50"
        />
        <div>
          <ReactStars
            count={5}
            size={24}
            activeColor="#ffd700"
            value={rating}
            onChange={newRating => setRating(newRating)}
          />
        </div>
        <button type="submit">리뷰 제출</button>
      </form>
    </div>
  );
}

ReviewPage.propTypes = {
  addReview: PropTypes.func
};

export default ReviewPage;