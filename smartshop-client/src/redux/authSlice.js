import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null, // Try to load from local storage first
    isAuthenticated: !!localStorage.getItem("token"),
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token; // Save the token
            state.isAuthenticated = true;
            state.user = action.payload.user;
            localStorage.setItem("token", action.payload.token); // Persist it!
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("token"); // Clear it!
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;