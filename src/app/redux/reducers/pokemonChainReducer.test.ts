import reducer, {
  setPokemonChainInitialState,
  fetchPokemonChainData,
} from "./pokemonChainReducer";
import axios from "axios";
import { UnknownAction } from "redux";
import { configureStore } from "@reduxjs/toolkit";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("pokemonChainReducer", () => {
  const initialState = {
    pokemons: [],
    status: "idle",
    isLoading: true,
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, {} as UnknownAction)).toEqual(initialState);
  });

  it("should handle setPokemonChainInitialState", () => {
    const modifiedState = {
      pokemons: [{ name: "pikachu", image: "img.png", typeList: ["electric"] }],
      status: "success",
      isLoading: false,
    };
    expect(reducer(modifiedState, setPokemonChainInitialState())).toEqual(
      initialState
    );
  });

  it("should handle fetchPokemonChainData.pending", () => {
    const action = { type: fetchPokemonChainData.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.status).toBe("loading");
  });

  it("should handle fetchPokemonChainData.fulfilled", () => {
    const action = {
      type: fetchPokemonChainData.fulfilled.type,
      payload: {
        pokemons: [
          { name: "bulbasaur", image: "img.png", typeList: ["grass"] },
        ],
      },
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.status).toBe("success");
    expect(state.pokemons.length).toBe(1);
  });

  it("should handle fetchPokemonChainData.rejected", () => {
    const action = { type: fetchPokemonChainData.rejected.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.status).toBe("fail");
  });
});

describe("fetchPokemonChainData async thunk", () => {
  const store = configureStore({ reducer: { pokemon: reducer } });

  it("should fetch pokemon chain and dispatch fulfilled", async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes("species")) {
        return Promise.resolve({
          data: { evolution_chain: { url: "evolution-chain" } },
        });
      } else if (url.includes("evolution-chain")) {
        return Promise.resolve({
          data: {
            chain: {
              species: { name: "pichu", url: "" },
              evolves_to: [
                {
                  species: { name: "pikachu", url: "" },
                  evolves_to: [
                    { species: { name: "raichu", url: "" }, evolves_to: [] },
                  ],
                },
              ],
            },
          },
        });
      } else if (url.includes("pokemons")) {
        return Promise.resolve({
          data: {
            name: "pikachu",
            sprites: { other: { dream_world: { front_default: "img.png" } } },
            types: [{ slot: 1, type: { name: "electric", url: "" } }],
          },
        });
      }
      return Promise.reject(new Error("not found"));
    });

    await store.dispatch(fetchPokemonChainData("pikachu") as any);
    const state = store.getState().pokemon;
    expect(state.pokemons.length).toBe(3);
    expect(state.pokemons[0].name).toBe("pikachu");
    expect(state.status).toBe("success");
  });
});
