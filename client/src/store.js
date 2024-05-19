import { configureStore, createSlice } from '@reduxjs/toolkit';

/*// 그룹 데이터 슬라이스
const groupDataSlice = createSlice({
  name: 'groupData',
  initialState: {
    title: '',
    limit: 0,
    content: ''
  },
  reducers: {
    setGroupData(state, action) {
      state.title = action.payload.title;
      state.limit = action.payload.limit;
      state.content = action.payload.content;
    },
    clearGroupData(state) {
      state.title = '';
      state.limit = 0;
      state.content = '';
    }
  }
}); */

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

//export const { setGroupData, clearGroupData } = groupDataSlice.actions;
export const { addReview } = reviewsSlice.actions;

export default configureStore({
  reducer: {
    //groupData: groupDataSlice.reducer,
    reviews: reviewsSlice.reducer
  }
});