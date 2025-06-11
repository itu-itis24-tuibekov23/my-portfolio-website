// src/store/educationSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEducations = createAsyncThunk('education/fetchEducations', async () => {
  const res = await fetch('/api/educations');
  return await res.json();
});

const educationSlice = createSlice({
  name: 'education',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEducations.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchEducations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEducations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export default educationSlice.reducer;
