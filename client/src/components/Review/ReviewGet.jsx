import React, { useState } from 'react';
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

export default ReviewGet;
