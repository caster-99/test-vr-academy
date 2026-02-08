import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoursesState, CourseType } from 'types/course';
import axios from 'api/axiosConfig';
import { RootState } from '../index';

export const fetchCourseTypeById = createAsyncThunk(
  'courses/fetchCourseTypeById',
  async (id: number, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    if (state.courses.courseTypesCache[id]) {
      return state.courses.courseTypesCache[id];
    }

    try {
      const response = await axios.get(`/courseTypes/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Error al cargar el tipo de curso');
    }
  }
);

const initialState: CoursesState = {
  courseTypesCache: {}
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchCourseTypeById.fulfilled, (state, action: PayloadAction<CourseType>) => {
            state.courseTypesCache[action.payload.id] = action.payload;
        });
  }
});

export default coursesSlice.reducer;