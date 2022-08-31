import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    token: "",
    name: "Kirilg"
}

const identity = createSlice({
    name: "identity",
    initialState,
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        }
    }
})

export const { setIsAuthenticated, setToken, setName } = identity.actions;

export default identity.reducer;
