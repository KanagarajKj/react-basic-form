import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  mobileNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
  qualification: {},
  maritalStatus: '',
  acceptTermsAndConditions: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormValues: (state, action) => {
      state.fullName = action.payload.fullName;
      state.mobileNumber = action.payload.mobileNumber;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
      state.qualification = action.payload.qualification;
      state.maritalStatus = action.payload.maritalStatus;
      state.acceptTermsAndConditions = action.payload.acceptTermsAndConditions;
    },
    clearForm:(state)=> {
       state.fullName = "" ;
       state.mobileNumber = "";
       state.email = "" ;
       state.password = "";
       state.confirmPassword = "" ;
       state.qualification = "";
       state.maritalStatus = "" ;
       state.acceptTermsAndConditions = "" ;
    }
  },
});

export const { setFormValues, clearForm } = formSlice.actions;

export default formSlice.reducer;
