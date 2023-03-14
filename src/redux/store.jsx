import { legacy_createStore, compose, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // defaults to localStorage for web
import userReducer from "./user/user.reducer";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = legacy_createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);
