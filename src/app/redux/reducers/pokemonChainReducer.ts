import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getSpeciesApiUrl = process.env.NEXT_PUBLIC_GET_POKEMON_SPECIES;
const getPokemonApiUrl = process.env.NEXT_PUBLIC_GET_POKEMONS_API_URL;

type EvolutionChain = {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChain[];
};

type PokemonChain = {
  pokemons: Array<PokemonType>;
  status: string;
  isLoading: boolean;
};

const pokemonChainInitialState: PokemonChain = {
  pokemons: [],
  status: "idle",
  isLoading: true,
};

export const fetchPokemonChainData = createAsyncThunk(
  "pokemon/fetchPokemonChainData",
  async (pokemonName: string, thunkAPI) => {
    if (!getSpeciesApiUrl) {
      throw new Error(
        "GET_ALL_POKEMONS_API_URL is not defined in environment variables"
      );
    }

    try {
      const getSpeciesApiUrlWithParams = `${getSpeciesApiUrl}${pokemonName}`;

      const pokemonResponse = await axios.get(getSpeciesApiUrlWithParams);
      const getPokemonChainUrl = pokemonResponse.data.evolution_chain.url;

      const pokemonChainResponse = await axios.get(getPokemonChainUrl);

      const evolutionChain = parseEvolutionChain(
        pokemonChainResponse.data.chain
      );

      const pokemonDetailsPromises = evolutionChain.map(
        async (pokemonNameInChain: string) => {
          const getPokemonApiUrlWithParams = `${getPokemonApiUrl}${pokemonNameInChain}`;
          const response = await axios.get(getPokemonApiUrlWithParams);
          const { name, sprites, types } = response.data;
          const image =
            sprites.other.dream_world.front_default === null
              ? "/images/pokeball.webp"
              : sprites.other.dream_world.front_default;
          const typeList = types.map(
            (type: { slot: number; type: { name: string; url: string } }) =>
              type.type.name
          );
          return { name, image, typeList };
        }
      );

      const pokemonDetails = await Promise.all(pokemonDetailsPromises);

      return { pokemons: pokemonDetails };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.response?.data ?? { message: err.message }
      );
    }
  }
);

const parseEvolutionChain = (chain: EvolutionChain): string[] => {
  const result: string[] = [];
  const traverse = (chain: EvolutionChain) => {
    result.push(chain.species.name);
    if (chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((evolution) => {
        traverse(evolution);
      });
    }
  };
  traverse(chain);
  return result;
};

const pokemonChainSlice = createSlice({
  name: "pokemonChain",
  initialState: pokemonChainInitialState,
  reducers: {
    setPokemonChainInitialState: (state) => {
      state.pokemons = [];
      state.status = "idle";
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonChainData.fulfilled, (state, action) => {
      state.pokemons = action.payload.pokemons;
      state.isLoading = false;
      state.status = "success";
    });
    builder.addCase(fetchPokemonChainData.pending, (state, action) => {
      state.isLoading = true;
      state.status = "loading";
    });
    builder.addCase(fetchPokemonChainData.rejected, (state, action) => {
      state.isLoading = false;
      state.status = "fail";
    });
  },
});

export const { setPokemonChainInitialState } = pokemonChainSlice.actions;
export default pokemonChainSlice.reducer;
