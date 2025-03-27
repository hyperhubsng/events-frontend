import { apiSlice } from '@/features/api/apiSlice';
import { authReducer } from '@/features/auth/authSlice';
import { eventsReducer } from '@/features/events/eventsSlice';
import { ticketsReducer } from '@/features/tickets/ticketsSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
	return {
		getItem() {
			return Promise.resolve(null);
		},
		setItem(key: string, value: string) {
			return Promise.resolve(value);
		},
		removeItem() {
			return Promise.resolve();
		},
	};
};

const storage =
	typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
	key: 'hyperhubs-admin',
	version: 1,
	storage,
	whitelist: ['auth', 'events'],
};

const rootReducer = combineReducers({
	auth: authReducer,
	tickets: ticketsReducer,
	events: eventsReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
