import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoursesState, CourseType } from 'types/course';



const initialState: CoursesState = {
  courseTypesCache: {}
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    saveCourseTypeToCache: (state, action: PayloadAction<CourseType>) => {
      state.courseTypesCache[action.payload.id] = action.payload;
    }
  }
});

export const { saveCourseTypeToCache } = coursesSlice.actions;
export default coursesSlice.reducer;