import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
    failed: false
}

const connection = createSlice({
    name: "connection",
    initialState,
    reducers: {
        setConnection: (state, action) => {
            state.value = action.payload;
        },
        setFailed: (state, action) => {
            state.failed = action.payload;
        }
    }
})

export const { setConnection, setFailed } = connection.actions;

export default connection.reducer;
