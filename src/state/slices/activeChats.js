import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

const activeChats = createSlice({
    name: "activeChats",
    initialState,
    reducers: {
        setChats: (state, action) => {
            state.value = action.payload;
        },
        addChat: (state, action) => {
            if (state.value.filter(chat => chat.getId() === action.payload.getId()).length === 0) {
                state.value = [...state.value, action.payload].sort((a, b) => a.compare(b));
            }
        },
        removeChat: (state, action) => {
            state.value = state.value.filter(chat => chat.getId() !== action.payload);
        }
    }
});

export const { setChats, addChat, removeChat } = activeChats.actions;

export default activeChats.reducer;
