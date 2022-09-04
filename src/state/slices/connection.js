import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
    processing: false,
    failed: false,
    isAuthenticated: false
}

const connection = createSlice({
    name: "connection",
    initialState,
    reducers: {
        setConnection: (state, action) => {
            state.value = action.payload;
        },
        setProcessing: (state, action) => {
            state.processing = action.payload;
        },
        setFailed: (state, action) => {
            state.failed = action.payload;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    }
})

export const { setConnection, setProcessing, setFailed, setIsAuthenticated } = connection.actions;

export default connection.reducer;
