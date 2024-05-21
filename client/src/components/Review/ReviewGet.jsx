/*import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";

function ReviewGet() {
  const reviews = useSelector(state => state.reviews);
  const navigate = useNavigate();
  const { placeName } = useParams();
  const [clickCount, setClickCount] = useState(0);

  const handleUserPage = () => {
    if (clickCount === 0) {
      navigate(-1);
    } else {
      navigate(-2);
    }
    setClickCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <h1>리뷰 목록</h1>
      {reviews.length === 0 ? (
        <p>리뷰가 없습니다.</p>
      ) : (
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <p><strong>리뷰:</strong> {review.review}</p>
              <p><strong>별점:</strong> {review.rating}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleUserPage}>돌아가기</button>
    </div>
  );
}

export default ReviewGet; */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import './reviewGet.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Rprofile from './profile1.png';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <i
        key={i}
        className={`fa-star ${i <= rating ? 'fas' : 'far'}`}
        style={{ color: 'gold', marginRight: '5px' }}
      ></i>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

function ReviewGet() {
  const reviews = useSelector(state => state.reviews);
  const navigate = useNavigate();
  const { placeName } = useParams();
  const [clickCount, setClickCount] = useState(0);

  const handleUserPage = () => {
    if (clickCount === 0) {
      navigate(-1);
    } else {
      navigate(-2);
    }
    setClickCount(prevCount => prevCount + 1);
  };

  return (
    <div className="Rcontainer">
      <h2 className='Rtitle'>리뷰 리스트</h2>
      <div className="Rpro">
        <img src={Rprofile} alt="Profile" className="Rpro-image" />
        <h2>Edwin</h2>
      </div>
      <div className="review-list">
        {reviews.length === 0 ? (
          <h3>리뷰가 없습니다.</h3>
        ) : (
          reviews.map((review, index) => (
            <div className="review-item" key={index}>
              <div className="review-header">
                <div className="title-rating">
                  <h3 className='Rh3'>Jonnie</h3>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="review-content">{review.review}</p>
            </div>
          ))
        )}
      </div><br />
      <button className='cancel-button-userg' onClick={handleUserPage}>돌아가기</button>
    </div>
  );
}

export default ReviewGet;

