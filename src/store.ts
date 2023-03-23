import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/user.slice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'userProfile_SocialMedia',
  storage
}

const persistedReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: persistedReducer
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch