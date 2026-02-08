import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CountriesState, Country } from 'types/country';
import axios from 'api/axiosConfig';

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/countries');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Error al cargar países');
    }
  }
);

const initialState: CountriesState = {
  list: [],
  loading: false
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action: PayloadAction<Country[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCountries.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default countriesSlice.reducer;