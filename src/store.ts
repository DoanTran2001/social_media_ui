import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./redux/user.slice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import saveSlice from "./redux/save.slice";

const persistConfig = {
  key: 'userProfile_SocialMedia',
  storage
}

const persistSavedConfig = {
  key: 'saved_SocialMedia',
  storage
}

const persistedReducer = persistReducer(persistConfig, userSlice);

const persistedReducerSaved = persistReducer(persistSavedConfig, saveSlice)

const rootReducer = combineReducers({
  user: persistedReducer,
  saved: persistedReducerSaved
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch