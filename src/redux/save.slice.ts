import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../apis/user.api";

interface SavedInterface {
  saved: {
    [key: string]: string[]
  }
}

const initialState: SavedInterface = {
  saved: {},
};

// export const getSaveIds = createAsyncThunk("saved/getSaveIds", async (data, { rejectWithValue }) => {
//   try {
//     const response = await userApi.getSavedIds()
//     return response.data
//   } catch (error) {
//     throw rejectWithValue(error)
//   }
// })

const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    addToSave: (state, action) => {
      const { savedId, postId } = action.payload;
      if (!state.saved[savedId]) {
        state.saved[savedId] = [];
      }
      if(state.saved[savedId].includes(postId)) {
        return
      }
      state.saved[savedId].push(postId);
    },
  },
});

export const { addToSave } = savedSlice.actions;
export default savedSlice.reducer;
