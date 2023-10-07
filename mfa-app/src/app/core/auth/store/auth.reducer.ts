import { createReducer, on } from "@ngrx/store";
import { AuthUser } from "../models/auth-user.model";
import { loginSuccess } from "./auth.actions";

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