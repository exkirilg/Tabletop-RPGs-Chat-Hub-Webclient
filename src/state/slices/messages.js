import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

const messages = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.value = state.value.filter((msg) => msg.getChatId() !== action.payload.chatId);
            state.value = state.value.concat(action.payload.msgs).sort((a, b) => a.compare(b));
        },
        addMessage: (state, action) => {
            state.value = [...state.value, action.payload].sort((a, b) => a.compare(b));
        }
    }
});

export const { setMessages, addMessage } = messages.actions;

export default messages.reducer;
