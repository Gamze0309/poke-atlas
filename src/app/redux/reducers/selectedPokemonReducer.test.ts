import reducer, {
  fetchPokemonData,
  setSelectedPokemon,
  clearSelectedPokemon,
} from "./selectedPokemonReducer";
import axios from "axios";
import { UnknownAction } from "@reduxjs/toolkit";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("selectedPokemonReducer", () => {
  const initialState = {
    pokemon: null,
    status: "idle",
  };

  it("should return initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle pending state", () => {
    const action: UnknownAction = { type: fetchPokemonData.pending.type };
    const newState = reducer(initialState, action);
    expect(newState.status).toBe("loading");
  });

  it("should handle fulfilled state", () => {
    const payload = {
      pokemon: {
        name: "pikachu",
        image: "pikachu.svg",
        typeList: ["electric"],
      },
    };

    const action: UnknownAction = {
      type: fetchPokemonData.fulfilled.type,
      payload,
    };

    const newState = reducer(initialState, action);
    expect(newState.status).toBe("success");
    expect(newState.pokemon?.name).toBe("pikachu");
  });

  it("should handle rejected state", () => {
    const action: UnknownAction = { type: fetchPokemonData.rejected.type };
    const newState = reducer(initialState, action);
    expect(newState.status).toBe("failed");
  });

  it("should handle setSelectedPokemon reducer", () => {
    const action = setSelectedPokemon({
      pokemon: { name: "bulbasaur", image: "img.svg", typeList: ["grass"] },
    });
    const newState = reducer(initialState, action);
    expect(newState.pokemon?.name).toBe("bulbasaur");
  });

  it("should handle clearSelectedPokemon reducer", () => {
    const modifiedState = {
      pokemon: { name: "charmander", image: "x.svg", typeList: ["fire"] },
      status: "success",
    };
    const action = clearSelectedPokemon();
    const newState = reducer(modifiedState, action);
    expect(newState).toEqual(initialState);
  });

  it("fetchPokemonData should dispatch fulfilled when successful", async () => {
    const mockResponse = {
      data: {
        name: "squirtle",
        sprites: { other: { dream_world: { front_default: "squirtle.svg" } } },
        types: [{ slot: 1, type: { name: "water" } }],
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchPokemonData("squirtle")(dispatch, getState, undefined);

    const fulfilledAction = dispatch.mock.calls.find(
      (call) => call[0].type === fetchPokemonData.fulfilled.type
    );

    expect(fulfilledAction).toBeTruthy();
    expect(mockedAxios.get).toHaveBeenCalledWith("pokemons/squirtle");
    expect(fulfilledAction[0].payload.pokemon.name).toBe("squirtle");
  });

  it("fetchPokemonData should dispatch rejected when API fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API error"));

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchPokemonData("eevee")(dispatch, getState, undefined);

    const rejectedAction = dispatch.mock.calls.find(
      (call) => call[0].type === fetchPokemonData.rejected.type
    );

    expect(rejectedAction).toBeTruthy();
    expect(rejectedAction[0].payload.message).toBe("API error");
  });
});
