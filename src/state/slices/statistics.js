import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: 0,
    users: 0
}

const statistics = createSlice({
    name: "statistics",
    initialState,
    reducers: {
        setStatistics: (state, action) => {
            state.chats = action.payload.chats;
            state.users =  action.payload.users;
        }
    }
});

export const { setStatistics } = statistics.actions;

export default statistics.reducer;
