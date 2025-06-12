// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import educationReducer from './educationSlice';
import skillsReducer from './skillsSlice';

export const store = configureStore({
  reducer: {
    education: educationReducer,
    skills: skillsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
