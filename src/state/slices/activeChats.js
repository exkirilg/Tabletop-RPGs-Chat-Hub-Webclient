import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

const activeChats = createSlice({
    name: "activeChats",
    initialState,
    reducers: {
        setActiveChats: (state, action) => {
            state.value = action.payload;
        },
        addActiveChat: (state, action) => {
            if (state.value.filter(chat => chat.getId() === action.payload.getId()).length === 0) {
                state.value = [...state.value, action.payload].sort((a, b) => a.compare(b));
            }
        },
        removeActiveChat: (state, action) => {
            state.value = state.value.filter(chat => chat.getId() !== action.payload);
        }
    }
});

export const { setActiveChats, addActiveChat, removeActiveChat } = activeChats.actions;

export default activeChats.reducer;
