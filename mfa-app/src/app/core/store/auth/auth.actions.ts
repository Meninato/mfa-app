import { IAuthLoginRequest, IAuthLoginResponse, IAuthSigninWithTokenResponse } from "@app/core/models/api/account.model";
import { createAction, props } from "@ngrx/store";

export const login = createAction(
  '[Auth Signin] Login',
  props<{request: IAuthLoginRequest}>()
);

export const loginSuccess = createAction(
  '[Auth Signin] Login success',
  props<{response: IAuthLoginResponse}>()
);

export const loginFailure = createAction(
  '[Auth Signin] Login failure',
  props<{error: string}>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const loadSession = createAction(
  '[Auth] Load user session',
  props<{response: IAuthSigninWithTokenResponse}>()
);