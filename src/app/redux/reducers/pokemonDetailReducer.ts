import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getPokemonApiUrl = process.env.NEXT_PUBLIC_GET_POKEMONS_API_URL;
const getSpeciesApiUrl = process.env.NEXT_PUBLIC_GET_POKEMON_SPECIES;

type BaseStats = {
  statNumber: number;
  name: string;
};

type AbilityList = {
  name: string;
  isHidden: boolean;
};

type PokemonDetail = {
  description: string;
  weight: number;
  height: number;
  abilityList: AbilityList[];
  baseStatList: BaseStats[];
  status: string;
  isLoading: boolean;
};

const pokemonDetailInitialState: PokemonDetail = {
  description: "",
  weight: 0,
  height: 0,
  abilityList: [],
  baseStatList: [],
  status: "idle",
  isLoading: true,
};

export const fetchPokemonDetailData = createAsyncThunk(
  "pokemon/fetchPokemonDetailData",
  async (pokemonName: string, thunkAPI) => {
    if (!getPokemonApiUrl || !getSpeciesApiUrl) {
      throw new Error(
        "GET_ALL_POKEMONS_API_URL is not defined in environment variables"
      );
    }
    try {
      const getPokemonApiUrlWithParams = `${getPokemonApiUrl}${pokemonName}`;
      const getSpeciesApiUrlWithParams = `${getSpeciesApiUrl}${pokemonName}`;

      const pokemonResponse = await axios.get(getPokemonApiUrlWithParams);
      const speciesResponse = await axios.get(getSpeciesApiUrlWithParams);

      const { weight, height, abilities, stats } = pokemonResponse.data;
      const abilityList = abilities.map(
        (ability: { ability: { name: string }; is_hidden: boolean }) => ({
          name: ability.ability.name,
          isHidden: ability.is_hidden,
        })
      );
      const baseStatList = stats.map(
        (stat: { base_stat: number; stat: { name: string } }) => ({
          statNumber: stat.base_stat,
          name: stat.stat.name,
        })
      );

      let description = "";
      for (const flavor_text_entry of speciesResponse.data
        .flavor_text_entries) {
        if (flavor_text_entry.language.name === "en") {
          description = flavor_text_entry.flavor_text;
          break;
        }
      }

      return {
        weight: weight,
        height: height,
        abilityList: abilityList,
        baseStatList: baseStatList,
        description: description,
      };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.response?.data ?? { message: err.message }
      );
    }
  }
);

const pokemonDetailSlice = createSlice({
  name: "pokemonDetail",
  initialState: pokemonDetailInitialState,
  reducers: {
    setPokemonDetailInitialState: (state) => {
      state.description = "";
      state.weight = 0;
      state.height = 0;
      state.abilityList = [];
      state.baseStatList = [];
      state.status = "idle";
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonDetailData.fulfilled, (state, action) => {
      state.height = action.payload.height;
      state.weight = action.payload.weight;
      state.abilityList = action.payload.abilityList;
      state.baseStatList = action.payload.baseStatList;
      state.description = action.payload.description;
      (state.status = "success"), (state.isLoading = false);
    });
    builder.addCase(fetchPokemonDetailData.pending, (state, action) => {
      state.isLoading = true;
      state.status = "loading";
    });
    builder.addCase(fetchPokemonDetailData.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});
export const { setPokemonDetailInitialState } = pokemonDetailSlice.actions;

export default pokemonDetailSlice.reducer;
