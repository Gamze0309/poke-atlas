import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getPokemonApiUrl = process.env.NEXT_PUBLIC_GET_POKEMONS_API_URL;

type SelectedokemonType = {
  pokemon: PokemonType;
  isLoading: boolean;
  status: string;
};

const selectedPokemonInitialState: SelectedokemonType = {
  pokemon: {
    name: "",
    image: "",
    typeList: [],
  },
  isLoading: true,
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
      state.pokemon.name = action.payload.pokemon.name;
      state.pokemon.image = action.payload.pokemon.image;
      state.pokemon.typeList = action.payload.pokemon.typeList;
      state.isLoading = false;
    },
    setSelectedPokemonInitialState: (state) => {
      state = selectedPokemonInitialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonData.pending, (state) => {
      state.isLoading = true;
      state.status = "loading";
    });
    builder.addCase(fetchPokemonData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.pokemon.name = action.payload.pokemon.name;
      state.pokemon.image = action.payload.pokemon.image;
      state.pokemon.typeList = action.payload.pokemon.typeList;
    });
    builder.addCase(fetchPokemonData.rejected, (state) => {
      state.isLoading = false;
      state.status = "fail";
    });
  },
});

export const { setSelectedPokemon, setSelectedPokemonInitialState } =
  selectedPokemonDetailSlice.actions;

export default selectedPokemonDetailSlice.reducer;
