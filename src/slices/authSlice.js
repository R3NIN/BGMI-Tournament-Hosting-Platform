import { createSlice } from "@reduxjs/toolkit";

// Helper function to check if user is admin
const checkIsAdmin = (user) => {
  if (!user) return false;
  // Check both possible locations for admin status
  return user.role === 'Admin' || user.accountType === 'Admin';
};

// Helper function to safely get token from localStorage
const getTokenFromStorage = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error getting token from localStorage:", error);
    return null;
  }
};

const initialState = {
  signupData: null,
  loading: false,
  token: getTokenFromStorage(),
  isAdmin: false,
  email: localStorage.getItem("email") || null,
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      const token = action.payload;
      state.token = token;
      
      // Update localStorage
      try {
        if (token) {
          localStorage.setItem("token", token);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error updating token in localStorage:", error);
      }
      
      // Update isAdmin based on user data if available
      if (state.user) {
        state.isAdmin = checkIsAdmin(state.user);
      }
    },
    setUser(state, action) {
      const user = action.payload;
      state.user = user;
      state.isAdmin = checkIsAdmin(user);
      
      // Update localStorage
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        state.email = user.email;
      } else {
        localStorage.removeItem("user");
        state.email = null;
      }
    },
    setEmail(state, action) {
      state.email = action.payload;
      if (action.payload) {
        localStorage.setItem("email", action.payload);
      } else {
        localStorage.removeItem("email");
      }
    },
    logout(state) {
      state.token = null;
      state.isAdmin = false;
      state.email = null;
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { 
  setSignupData, 
  setLoading, 
  setToken, 
  setEmail, 
  setUser,
  logout 
} = authSlice.actions;

export const selectIsAuthenticated = (state) => !!state.auth.token;
export const selectIsAdmin = (state) => state.auth.isAdmin;

export default authSlice.reducer;
