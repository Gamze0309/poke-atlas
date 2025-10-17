import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pokemonListReducer from "./reducers/pokemonListReducer";
import storage from "redux-persist/lib/storage";
import selectedPokemonReducer from "./reducers/selectedPokemonReducer";
import pokemonDetailReducer from "./reducers/pokemonDetailReducer";
import pokemonChainReducer from "./reducers/pokemonChainReducer";
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

const rootReducer = combineReducers({
  pokemonListReducer,
  selectedPokemonReducer,
  pokemonDetailReducer,
  pokemonChainReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "pokemonListReducer",
    "selectedPokemonReducer",
    "pokemonDetailReducer",
    "pokemonChainReducer",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
