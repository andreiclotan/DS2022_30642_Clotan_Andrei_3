import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import {
  persistStore,
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user", "student", "lessonTypes", "lesson", "editor"],
};

const rootReducer = {
  auth: authReducer,
};

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

const persistor = persistStore(store);
export { store, persistor };
