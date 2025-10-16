import reducer, {
  fetchPokemonDetailData,
  setPokemonDetailInitialState,
} from "./pokemonDetailReducer";
import axios from "axios";
import { UnknownAction } from "@reduxjs/toolkit";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("pokemonDetailReducer", () => {
  const initialState = {
    description: "",
    weight: 0,
    height: 0,
    abilityList: [],
    baseStatList: [],
    status: "idle",
    isLoading: true,
  };

  const mockPokemonResponse = {
    data: {
      weight: 60,
      height: 12,
      abilities: [
        { ability: { name: "overgrow" }, is_hidden: false },
        { ability: { name: "chlorophyll" }, is_hidden: true },
      ],
      stats: [
        { base_stat: 45, stat: { name: "hp" } },
        { base_stat: 49, stat: { name: "attack" } },
      ],
    },
  };

  const mockSpeciesResponse = {
    data: {
      flavor_text_entries: [
        { language: { name: "ja" }, flavor_text: "Japanese text" },
        { language: { name: "en" }, flavor_text: "English description" },
      ],
    },
  };

  it("should return initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle pending state", () => {
    const action: UnknownAction = { type: fetchPokemonDetailData.pending.type };
    const newState = reducer(initialState, action);
    expect(newState.status).toBe("loading");
  });

  it("should handle fulfilled state", () => {
    const payload = {
      weight: 60,
      height: 12,
      abilityList: [
        { name: "overgrow", isHidden: false },
        { name: "chlorophyll", isHidden: true },
      ],
      baseStatList: [
        { statNumber: 45, name: "hp" },
        { statNumber: 49, name: "attack" },
      ],
      description: "English description",
    };

    const action: UnknownAction = {
      type: fetchPokemonDetailData.fulfilled.type,
      payload,
    };

    const newState = reducer(initialState, action);

    expect(newState.status).toBe("success");
    expect(newState.isLoading).toBe(false);
    expect(newState.description).toBe("English description");
    expect(newState.abilityList).toHaveLength(2);
    expect(newState.baseStatList[0].name).toBe("hp");
  });

  it("should handle rejected state", () => {
    const action: UnknownAction = {
      type: fetchPokemonDetailData.rejected.type,
    };
    const newState = reducer(initialState, action);
    expect(newState.status).toBe("failed");
  });

  it("should reset to initial state with setPokemonDetailInitialState", () => {
    const modifiedState = {
      ...initialState,
      description: "Changed",
      status: "success",
    };

    const action = setPokemonDetailInitialState();
    const newState = reducer(modifiedState, action);
    expect(newState).toEqual(initialState);
  });

  it("fetchPokemonDetailData should dispatch fulfilled when successful", async () => {
    mockedAxios.get
      .mockResolvedValueOnce(mockPokemonResponse)
      .mockResolvedValueOnce(mockSpeciesResponse);

    const dispatch = jest.fn();
    const thunk = fetchPokemonDetailData("bulbasaur");
    const getState = jest.fn();

    await thunk(dispatch, getState, undefined);

    const fulfilledAction = dispatch.mock.calls.find(
      (call) => call[0].type === fetchPokemonDetailData.fulfilled.type
    );

    expect(fulfilledAction).toBeTruthy();
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(fulfilledAction[0].payload.description).toBe("English description");
  });

  it("fetchPokemonDetailData should dispatch rejected when API faileds", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API error"));

    const dispatch = jest.fn();
    const thunk = fetchPokemonDetailData("pikachu");
    const getState = jest.fn();

    await thunk(dispatch, getState, undefined);

    const rejectedAction = dispatch.mock.calls.find(
      (call) => call[0].type === fetchPokemonDetailData.rejected.type
    );

    expect(rejectedAction).toBeTruthy();
    expect(rejectedAction[0].payload.message).toBe("API error");
  });
});
