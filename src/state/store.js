import { configureStore, combineReducers } from "@reduxjs/toolkit";
import connectionReducer from "./slices/connection";
import identityReducer from "./slices/identity";
import activeChatsReducer from "./slices/activeChats";
import chatsReducer from "./slices/chats";

export default configureStore({
    reducer:
        combineReducers({
            connection: connectionReducer,
            identity: identityReducer,
            chats: chatsReducer,
            activeChats: activeChatsReducer
        }),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })  
})
