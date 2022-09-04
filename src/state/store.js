import { configureStore, combineReducers } from "@reduxjs/toolkit";
import connectionReducer from "./slices/connection";
import identityReducer from "./slices/identity";
import statisticsReducer from "./slices/statistics";

import chatsReducer from "./slices/chats";
import ownChatsReducer from "./slices/ownChats";
import activeChatsReducer from "./slices/activeChats";

export default configureStore({
    reducer:
        combineReducers({
            connection: connectionReducer,
            identity: identityReducer,
            statistics: statisticsReducer,
            chats: chatsReducer,
            ownChats: ownChatsReducer,
            activeChats: activeChatsReducer
        }),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })  
})
