// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  email: string;
  password: string;
  token: string | null;
  isGuest: boolean;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  username: '',
  email: '',
  password: '',
  token: null,
  isGuest: false,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Partial<UserState>>) => {
      const { username, email, password, token, isGuest, isLoggedIn } = action.payload;
      if (username) state.username = username;
      if (email) state.email = email;
      if (password) state.password = password;
      if (token) state.token = token;
      state.isGuest = isGuest ?? false;
      state.isLoggedIn = isLoggedIn ?? false;
    },
    logout: (state) => {
      state.username = '';
      state.email = '';
      state.password = '';
      state.token = null;
      state.isGuest = false;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
