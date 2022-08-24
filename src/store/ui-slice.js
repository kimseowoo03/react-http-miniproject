import { createSlice } from "@reduxjs/toolkit";
import { sendReviewList } from "./input-actions";
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    errorMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendReviewList.pending, (state) => {
        state.errorMessage = {
          title: "Pending!",
          message: "보내는 중입니다.",
        };
        console.log("보내는 중!");
      })
      .addCase(sendReviewList.fulfilled, (state) => {
        state.errorMessage = {
          title: "Fulfilled!",
          message: "잘 보냈습니다!",
        };
        console.log("잘 보냄!");
      })
      .addCase(sendReviewList.rejected, (state) => {
        state.errorMessage = {
          title: "Rejected",
          message: "보내는데 실패했습니다.",
        };
        console.log("실패!");
      });
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;