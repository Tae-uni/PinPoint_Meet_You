import { configureStore, createSlice } from '@reduxjs/toolkit';

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
});

export const { setGroupData, clearGroupData } = groupDataSlice.actions;

export default configureStore({
  reducer: {
    groupData: groupDataSlice.reducer
  }
});