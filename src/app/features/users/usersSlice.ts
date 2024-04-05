import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../interfaces";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const initialState: User[] = [];

export const fetchUsers = createAsyncThunk("posts/fetchUsers", async () => {
  const response = await axios.get(USERS_URL);
  return [...response.data];
  // const { message } = error as Error
  // return message;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

// export {  } = usersSlice.actions

export const selectAllUsers = (state: { users: User[] }) => state.users;

export default usersSlice.reducer;
