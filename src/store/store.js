import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../slice/form';

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});
