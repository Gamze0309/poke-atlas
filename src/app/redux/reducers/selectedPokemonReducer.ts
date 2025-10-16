import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getPokemonApiUrl = process.env.NEXT_PUBLIC_GET_POKEMONS_API_URL;

type SelectedPokemonType = {
  pokemon: PokemonType | null;
  status: string;
};

const selectedPokemonInitialState: SelectedPokemonType = {
  pokemon: null,
  status: "idle",
};

export const fetchPokemonData = createAsyncThunk(
  "pokemon/fetchPokemon",
  async (pokemonName: string, thunkAPI) => {
    if (!getPokemonApiUrl) {
      throw new Error(
        "GET_ALL_POKEMONS_API_URL is not defined in environment variables"
      );
    }

    try {
      const getPokemonApiUrlWithParams = `${getPokemonApiUrl}${pokemonName}`;

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
      return { pokemon: { name, image, typeList } };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.response?.data ?? { message: err.message }
      );
    }
  }
);

const selectedPokemonDetailSlice = createSlice({
  name: "selectedPokemonDetail",
  initialState: selectedPokemonInitialState,
  reducers: {
    setSelectedPokemon: (state, action) => {
      state.pokemon = action.payload.pokemon;
      state.status = "success";
    },
    clearSelectedPokemon: (state) => {
      state.pokemon = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPokemonData.fulfilled, (state, action) => {
      state.status = "success";
      state.pokemon = action.payload.pokemon as unknown as PokemonType;
    });
    builder.addCase(fetchPokemonData.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { setSelectedPokemon, clearSelectedPokemon } =
  selectedPokemonDetailSlice.actions;

export default selectedPokemonDetailSlice.reducer;
