import { apiSlice } from '@/features/api/apiSlice';
import { authReducer } from '@/features/auth/authSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['auth'],
};

const rootReducer = combineReducers({
	auth: authReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(authPersistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
