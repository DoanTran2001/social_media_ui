import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  date_of_birth?: Date;
  avatar?: string;
  address?: string;
  phone?: string;
  friends?: [
    {
      _id: string;
      name: string;
      avatar?: string;
    }
  ];
  posts?: string[];
  social?: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  website?: string;
  bio?: string;
}

interface AuthState {
  user: UserProfile | null;
}

const initialState: AuthState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
