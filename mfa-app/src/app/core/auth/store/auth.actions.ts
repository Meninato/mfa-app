import { IAuthLoginRequest, IAuthLoginResponse } from "@app/core/models/auth.model";
import { createAction, props } from "@ngrx/store";

export const login = createAction(
  '[Auth Signin] Login',
  props<{request: IAuthLoginRequest}>()
);

export const loginSuccess = createAction(
  '[Auth Signin] Login Success',
  props<{response: IAuthLoginResponse}>()
)