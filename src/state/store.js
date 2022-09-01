import { configureStore, combineReducers } from "@reduxjs/toolkit";
import connectionReducer from "./slices/connection";
import identityReducer from "./slices/identity";
import statisticsReducer from "./slices/statistics";
import activeChatsReducer from "./slices/activeChats";
import chatsReducer from "./slices/chats";

export default configureStore({
    reducer:
        combineReducers({
            connection: connectionReducer,
            identity: identityReducer,
            statistics: statisticsReducer,
            chats: chatsReducer,
            activeChats: activeChatsReducer
        }),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })  
})
