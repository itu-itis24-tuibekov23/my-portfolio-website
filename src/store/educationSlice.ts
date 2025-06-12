import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Education {
  date: string;
  title: string;
  description: string;
  additional?: string; // Optional field for additional details
}

interface EducationState {
  items: Education[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EducationState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchEducations = createAsyncThunk<Education[]>( // Specify return type
  'education/fetchEducations',
  async (_, { rejectWithValue }) => { // Use rejectWithValue for better error handling
    try {
      const res = await fetch('/api/educations');
      if (!res.ok) {
        // Throw an error with the response status text or a generic message
        const errorData = await res.json(); // Attempt to parse error response
        throw new Error(errorData.message || `HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      return data.educations; // Ensure this matches your MirageJS response structure
    } catch (err: any) {
      // Use rejectWithValue to pass a custom error message to extraReducers
      return rejectWithValue(err.message || 'An unknown error occurred');
    }
  }
);

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducations.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear any previous error when a new fetch starts
      })
      .addCase(fetchEducations.fulfilled, (state, action: PayloadAction<Education[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null; // Clear error on success
      })
      .addCase(fetchEducations.rejected, (state, action) => {
        state.status = 'failed';
        // The error message comes from rejectWithValue or the error object itself
        state.error = action.payload as string || action.error.message || 'Failed to fetch education data';
      });
  },
});

export default educationSlice.reducer;