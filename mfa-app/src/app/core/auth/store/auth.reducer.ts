import { createReducer, on } from "@ngrx/store";
import { loginSuccess } from "./auth.actions";
import { AuthUser } from "@app/core/models/auth.model";

export interface IAuthState {
  token: string;
  user: AuthUser | null;
}

const initialState: IAuthState = {
  token: "",
  user: null
}

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, payload) => {
    return {
      token: "",
      user: null
    };
  })
);

export const AUTH_FEATURE_KEY = 'auth';