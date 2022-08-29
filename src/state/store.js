import { configureStore, combineReducers } from "@reduxjs/toolkit";
import activeChatsReducer from "./slices/activeChats";
import chatsReducer from "./slices/chats";

const Store = () => {
    return configureStore({
        reducer:
            combineReducers({
                chats: chatsReducer,
                activeChats: activeChatsReducer
            }),
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false
            })
    });
}

export default Store;
