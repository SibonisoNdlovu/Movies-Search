import { IAppParams } from "./interfaces";

export function reducer(state: IAppParams, action: action): IAppParams {
  const payload = action.payload as IAppParams;

  switch (action.type) {
    case types.SET_PARAMS:
      return payload;
    case types.SET_QUERY: 
      return {...state, search: payload.search }
    case types.SET_GENRE: 
      return {...state, genre: payload.genre }
    default:
      return state;
  }
}

export const types = {
  SET_PARAMS: "SET_PARAMS",
  SET_QUERY: "SET_QUERY",
  SET_GENRE: "SET_GENRE"
};

export type action = {
  type: string;
  payload?: Partial<IAppParams> | IAppParams;
};
export const appState: IAppParams = { } as IAppParams;

export declare interface IState {
  params : IAppParams;
}
