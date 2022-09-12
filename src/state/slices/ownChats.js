import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

const ownChats = createSlice({
    name: "ownChats",
    initialState,
    reducers: {
        setOwnChats: (state, action) => {
            state.value = action.payload;
        },
        addOwnChat: (state, action) => {
            if (state.value.filter(chat => chat.getId() === action.payload.getId()).length === 0) {
                state.value = [...state.value, action.payload].sort((a, b) => a.compare(b));
            }
        },
        removeOwnChat: (state, action) => {
            state.value = state.value.filter(chat => chat.getId() !== action.payload);
        }
    }
});

export const { setOwnChats, addOwnChat, removeOwnChat } = ownChats.actions;

export default ownChats.reducer;
