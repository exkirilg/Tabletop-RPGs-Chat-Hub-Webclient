import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

const messages = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.value = [...state.value, action.payload].sort((a, b) => a.compare(b));
        }
    }
});

export const { addMessage } = messages.actions;

export default messages.reducer;
