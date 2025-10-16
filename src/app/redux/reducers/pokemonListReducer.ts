import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getPokemonApiUrl = process.env.NEXT_PUBLIC_GET_POKEMONS_API_URL;

type PokemonListType = {
  pokemons: PokemonType[];
  count: number;
  status: string;
};

const pokemonListInitialState: PokemonListType = {
  pokemons: [],
  count: 0,
  status: "idle",
};

export const fetchPokemonsData = createAsyncThunk(
  "pokemons/fetchPokemonsData",
  async (
    { offset, pageSize }: { offset: number; pageSize: number },
    thunkAPI
  ) => {
    if (!getPokemonApiUrl) {
      throw new Error(
        "GET_ALL_POKEMONS_API_URL is not defined in environment variables"
      );
    }

    try {
      const getPokemonApiUrlWithParams = `${getPokemonApiUrl}?&limit=${pageSize}&offset=${offset}`;
      const response = await axios.get(getPokemonApiUrlWithParams);

      const pokemonUrls: string[] = response.data.results.map(
        (pokemon: { name: string; url: string }) => pokemon.url
      );
      const count = response.data.count;

      const pokemonDetailsPromises = pokemonUrls.map(async (url: string) => {
        const response = await axios.get(url);
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
      });

      const pokemonDetails = await Promise.all(pokemonDetailsPromises);

      return { pokemons: pokemonDetails, count: count };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.response?.data ?? { message: err.message }
      );
    }
  }
);

const pokemonListSlice = createSlice({
  name: "pokemonList",
  initialState: pokemonListInitialState,
  reducers: {
    setPokemonListInitialState: (state) => {
      state = pokemonListInitialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonsData.fulfilled, (state, action) => {
      state.pokemons = action.payload.pokemons;
      state.count = action.payload.count;
      state.status = "success";
    });
    builder.addCase(fetchPokemonsData.pending, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(fetchPokemonsData.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});
export const { setPokemonListInitialState } = pokemonListSlice.actions;

export default pokemonListSlice.reducer;
