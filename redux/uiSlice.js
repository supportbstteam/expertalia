import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: true,
  companyInfoTab: 'company',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    setCompanyInfoTab: (state, action) => {
      state.companyInfoTab = action.payload;
    },
  },
});

export const { toggleSidebar, closeSidebar, openSidebar, setCompanyInfoTab } = uiSlice.actions;

export default uiSlice.reducer;
