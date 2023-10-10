import { createReducer, on } from "@ngrx/store";
import { login, loginFailure, loginSuccess, logout } from "./auth.actions";
import { AuthUser } from "@app/core/models/auth.model";

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
      user: new AuthUser(
        payload.response.firstName,
        payload.response.lastName,
        payload.response.email,
        payload.response.role,
        payload.response.created,
        payload.response.updated,
        payload.response.isVerified
      )
    };
  }),
  on(loginFailure, (state) => ({...state, loading: false})),
  on(logout, (state) => ({ ...initialState }))
);

export const AUTH_FEATURE_KEY = 'auth';