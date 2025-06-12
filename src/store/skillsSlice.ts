import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Skill {
  name: string;
  range: number;
}

interface SkillsState {
  items: Skill[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  addSkillStatus: 'idle' | 'loading' | 'succeeded' | 'failed'; // For add skill operation
  addSkillError: string | null; // For add skill error
}

const initialState: SkillsState = {
  items: [],
  status: 'idle', // Status for fetching all skills
  error: null,    // Error for fetching all skills
  addSkillStatus: 'idle', // Status for adding a single skill
  addSkillError: null,    // Error for adding a single skill
};

export const fetchSkills = createAsyncThunk<Skill[]>(
  'skills/fetchSkills',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/skills');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      return data.skills; // Ensure this matches your MirageJS response structure
    } catch (err: any) {
      return rejectWithValue(err.message || 'An unknown error occurred');
    }
  }
);

export const addSkill = createAsyncThunk<Skill, Skill>( // Returns the added skill, takes a skill object
  'skills/addSkill',
  async (newSkill, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSkill),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      return data.skill; // Mirage usually returns the created item under its model name
    } catch (err: any) {
      return rejectWithValue(err.message || 'An unknown error occurred while adding skill');
    }
  }
);


const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cases for fetchSkills
      .addCase(fetchSkills.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action: PayloadAction<Skill[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error.message || 'Failed to fetch skills';
      })
      // Cases for addSkill
      .addCase(addSkill.pending, (state) => {
        state.addSkillStatus = 'loading';
        state.addSkillError = null;
      })
      .addCase(addSkill.fulfilled, (state, action: PayloadAction<Skill>) => {
        state.addSkillStatus = 'succeeded';
        state.items.push(action.payload); // Add the newly created skill to the items array
        state.addSkillError = null;
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.addSkillStatus = 'failed';
        state.addSkillError = action.payload as string || action.error.message || 'Failed to add skill';
      });
  },
});

export default skillsSlice.reducer;