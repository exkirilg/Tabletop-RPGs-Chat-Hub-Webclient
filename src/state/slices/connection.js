import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
}

const connection = createSlice({
    name: "connection",
    initialState,
    reducers: {
        setConnection: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setConnection } = connection.actions;

export default connection.reducer;
