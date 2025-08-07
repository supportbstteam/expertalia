import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './companySlice';
import uiReducer from './uiSlice';

const store = configureStore({
  reducer: {
    company: companyReducer,
    ui: uiReducer,
  },
});

export default store;
