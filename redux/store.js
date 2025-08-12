import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './companySlice';
import uiReducer from './uiSlice';
import languageReducer from './languageSlice';

const store = configureStore({
  reducer: {
    company: companyReducer,
    ui: uiReducer,
    language: languageReducer,
  },
});

export default store;
