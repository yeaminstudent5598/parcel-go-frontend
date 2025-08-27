// src/features/users/userSlice.ts
import type { IUser } from "@/types/user";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
  users: IUser[];
}

const initialState: UsersState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      const index = state.users.findIndex(user => user._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user._id !== action.payload);
    },
  },
});

export const { setUsers, addUser, updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
