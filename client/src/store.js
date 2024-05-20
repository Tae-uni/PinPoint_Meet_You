import { configureStore, createSlice } from '@reduxjs/toolkit';

// 그룹 참여 상태 슬라이스
const joinStatusSlice = createSlice({
  name: 'joinStatus',
  initialState: false,
  reducers: {
    joinGroup(state) {
      return true;
    },
    leaveGroup(state) {
      return false;
    }
  }
});

// 리뷰 슬라이스 추가
const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: [],
  reducers: {
    addReview(state, action) {
      state.push({
        review: action.payload.review,
        rating: action.payload.rating
      });
    }
  }
});

export const { joinGroup, leaveGroup } = joinStatusSlice.actions;
export const { addReview } = reviewsSlice.actions;

export default configureStore({
  reducer: {
    joinStatus: joinStatusSlice.reducer,
    reviews: reviewsSlice.reducer
  }
});
