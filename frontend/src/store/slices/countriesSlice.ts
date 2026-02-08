import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CountriesState, Country } from 'types/country';



const initialState: CountriesState = {
  list: [],
  loading: false
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.list = action.payload;
    }
  }
});

export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer;