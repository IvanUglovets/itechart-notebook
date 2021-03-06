import {configureStore} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {rootReducer} from "./rootReducer/rootReducer";


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['todos', 'basket']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})


export type AppDispatch = typeof store.dispatch