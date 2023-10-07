import { createAction, props } from "@ngrx/store";
import { IAuthLoginRequest } from "../models/auth-login-request.model";
import { IAuthLoginResponse } from "../models/auth-login-response.model";

export const login = createAction(
  '[Auth Signin] Login',
  props<{request: IAuthLoginRequest}>()
);

export const loginSuccess = createAction(
  '[Auth Signin] Login Success',
  props<{response: IAuthLoginResponse}>()
)