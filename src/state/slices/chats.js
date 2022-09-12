import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
    search: null
}

const chats = createSlice({
    name: "chats",
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
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    }
});

export const { setChats, addChat, removeChat, setSearch } = chats.actions;

export default chats.reducer;
