import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    identityIsRestored: false,
    isAuthenticated: false,
    token: "",
    username: "",
    nickname: ""
}

const identity = createSlice({
    name: "identity",
    initialState,
    reducers: {
        setIdentityIsRestored: (state, action) => {
           state.identityIsRestored = action.payload;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setNickname: (state, action) => {
            state.nickname = action.payload;
        }
    }
})

export const { setIdentityIsRestored, setIsAuthenticated, setToken, setUsername, setNickname } = identity.actions;

export default identity.reducer;
