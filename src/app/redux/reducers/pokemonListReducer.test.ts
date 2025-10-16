import reducer, {
  fetchPokemonsData,
  setPokemonListInitialState,
} from "./pokemonListReducer";
import axios from "axios";
import { UnknownAction } from "@reduxjs/toolkit";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("pokemonListReducer", () => {
  const initialState = {
    pokemons: [],
    count: 0,
    status: "idle",
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle pending state", () => {
    const action: UnknownAction = { type: fetchPokemonsData.pending.type };
    const newState = reducer(initialState, action);
    expect(newState.status).toBe("loading");
  });

  it("should handle fulfilled state", () => {
    const payload = {
      pokemons: [
        { name: "bulbasaur", image: "img.png", typeList: ["grass"] },
        { name: "charmander", image: "img.png", typeList: ["fire"] },
      ],
      count: 2,
    };
    const action: UnknownAction = {
      type: fetchPokemonsData.fulfilled.type,
      payload,
    };
    const newState = reducer(initialState, action);
    expect(newState.status).toBe("success");
    expect(newState.count).toBe(2);
    expect(newState.pokemons[0].name).toBe("bulbasaur");
  });

  it("should handle rejected state", () => {
    const action: UnknownAction = { type: fetchPokemonsData.rejected.type };
    const newState = reducer(initialState, action);
    expect(newState.status).toBe("failed");
  });

  it("should reset to initial state with setPokemonListInitialState", () => {
    const modifiedState = {
      pokemons: [{ name: "pikachu", image: "x", typeList: ["electric"] }],
      count: 1,
      status: "success",
    };
    const action = setPokemonListInitialState();
    const newState = reducer(modifiedState, action);
    expect(newState).toEqual(initialState);
  });

  it("fetchPokemonsData should dispatch fulfilled when successful", async () => {
    const mockListResponse = {
      data: {
        count: 2,
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
          { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
        ],
      },
    };

    const mockDetailResponse1 = {
      data: {
        name: "bulbasaur",
        sprites: { other: { dream_world: { front_default: "bulba.svg" } } },
        types: [{ slot: 1, type: { name: "grass" } }],
      },
    };

    const mockDetailResponse2 = {
      data: {
        name: "charmander",
        sprites: { other: { dream_world: { front_default: "char.svg" } } },
        types: [{ slot: 1, type: { name: "fire" } }],
      },
    };

    mockedAxios.get
      .mockResolvedValueOnce(mockListResponse)
      .mockResolvedValueOnce(mockDetailResponse1)
      .mockResolvedValueOnce(mockDetailResponse2);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchPokemonsData({ offset: 0, pageSize: 2 })(
      dispatch,
      getState,
      undefined
    );

    const fulfilledAction = dispatch.mock.calls.find(
      (call) => call[0].type === fetchPokemonsData.fulfilled.type
    );

    expect(fulfilledAction).toBeTruthy();
    expect(mockedAxios.get).toHaveBeenCalledTimes(3);
    expect(fulfilledAction[0].payload.pokemons).toHaveLength(2);
    expect(fulfilledAction[0].payload.pokemons[0].name).toBe("bulbasaur");
  });

  it("fetchPokemonsData should dispatch rejected when API fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API error"));

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchPokemonsData({ offset: 0, pageSize: 10 })(
      dispatch,
      getState,
      undefined
    );

    const rejectedAction = dispatch.mock.calls.find(
      (call) => call[0].type === fetchPokemonsData.rejected.type
    );

    expect(rejectedAction).toBeTruthy();
    expect(rejectedAction[0].payload.message).toBe("API error");
  });
});
