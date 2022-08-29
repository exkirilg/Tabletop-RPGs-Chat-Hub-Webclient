import { configureStore, combineReducers } from "@reduxjs/toolkit";
import activeChatsReducer from "./slices/activeChats";
import chatsReducer from "./slices/chats";

export default configureStore({
    reducer:
        combineReducers({
            chats: chatsReducer,
            activeChats: activeChatsReducer
        }),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })  
})
