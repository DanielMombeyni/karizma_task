import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth";



const rootReducer = combineReducers({
    auth: authReducer,
});

const persistedReducer = persistReducer(
    {
        key: "root",
        storage: storage,
    },
    rootReducer
);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});


export const persistor = persistStore(store);

export default store;
