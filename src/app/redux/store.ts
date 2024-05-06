import { configureStore } from '@reduxjs/toolkit';
import pokemonListReducer from './reducers/pokemonListReducer';
import thunk from 'redux-thunk';
import selectedPokemonReducer from './reducers/selectedPokemonReducer';
import pokemonDetailReducer from './reducers/pokemonDetailReducer';
import pokemonChainReducer from './reducers/pokemonChainReducer';

export const makeStore = () => {
  return configureStore({
    reducer: {pokemonListReducer,
      selectedPokemonReducer,
      pokemonDetailReducer,
      pokemonChainReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']