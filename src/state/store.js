import { configureStore, combineReducers } from "@reduxjs/toolkit";
import activeChatsReducer from "./slices/activeChats";
import chatsReducer from "./slices/chats";
import connectionReducer from "./slices/connection";

export default configureStore({
    reducer:
        combineReducers({
            connection: connectionReducer,
            chats: chatsReducer,
            activeChats: activeChatsReducer
        }),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })  
})
