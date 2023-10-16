import { createReducer, on } from "@ngrx/store";
import { loadSession, login, loginFailure, loginSuccess, logout } from "./auth.actions";
import { AuthUser } from "@app/core/models/api/account.model";

export interface IAuthState {
  token: string;
  user: AuthUser | null;
  loading: boolean;
}

const initialState: IAuthState = {
  token: "",
  user: null,
  loading: false
}

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({...state, loading: true})),
  on(loginSuccess, (state, payload) => {
    return {
      loading: false,
      token: payload.response.jwtToken,
      user: AuthUser.fromResponse(payload.response)
    };
  }),
  on(loginFailure, (state) => ({...state, loading: false})),
  on(logout, (state) => ({ ...initialState })),
  on(loadSession, (state, payload) => {
    console.log("loading the session", payload);
    return {
      ...state,
      user: AuthUser.fromResponse(payload.response)
    };
  })
);

export const AUTH_FEATURE_KEY = 'auth';