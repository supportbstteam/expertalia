import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companyId: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyId: (state, action) => {
      state.companyId = action.payload;
    },
  },
});

export const { setCompanyId } = companySlice.actions;
export default companySlice.reducer;
