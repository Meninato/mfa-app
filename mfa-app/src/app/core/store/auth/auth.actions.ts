import { IAuthLoginRequest, IAuthLoginResponse } from "@app/core/models/api/account.model";
import { createAction, props } from "@ngrx/store";

export const login = createAction(
  '[Auth Signin] Login',
  props<{request: IAuthLoginRequest}>()
);

export const loginSuccess = createAction(
  '[Auth Signin] Login Success',
  props<{response: IAuthLoginResponse}>()
)

export const loginFailure = createAction(
  '[Auth Signin] Login Failure',
  props<{error: string}>()
)

export const logout = createAction(
  '[Auth] Logout'
)