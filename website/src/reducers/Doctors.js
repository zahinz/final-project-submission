import { createSlice } from "@reduxjs/toolkit";

const initialDoctorState = {
  doctors: [],
};

export const doctorSlice = createSlice({
  name: "auth",
  initialState: {
    doctor: initialDoctorState,
  },
  reducers: {
    addDoctor: (state, action) => {
      state.doctor = action.payload;
    },
    removeDoctor: (state) => {
      state.doctor = initialDoctorState;
    },
  },
});

export const { addDoctor, removeDoctor } = doctorSlice.actions;

export default doctorSlice.reducer;
