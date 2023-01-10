import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import albumListReducer from "./slices/albumListSlice";
import artistDetailsReducer from "./slices/artistDetailsSlice";
import artistListReducer from "./slices/artistListSlice";
import playlistDetailsReducer from "./slices/playlistDetailsSlice";
import plyalistsReducer from "./slices/playlistsSlice";
import trackListReducer from "./slices/trackListSlice";
import userReducer from "./slices/userSlice";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	whitelist: [],
};

const userPersistConfig = {
	key: "user",
	storage,
	blacklist: ["status"],
};

const rootReducer = combineReducers({
	user: persistReducer(userPersistConfig, userReducer),
	trackList: trackListReducer,
	albumList: albumListReducer,
	artistList: artistListReducer,
	playlists: plyalistsReducer,
	artistDetails: artistDetailsReducer,
	playlistDetails: playlistDetailsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
