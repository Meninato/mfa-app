import { IAuthLoginRequest, IAuthLoginResponse, IAuthRefreshTokenResponse, IAuthSigninWithTokenResponse } from "@app/core/models/api/account.model";
import { createAction, props } from "@ngrx/store";

export const login = createAction(
  '[Auth Signin] Login',
  props<{request: IAuthLoginRequest}>()
);

export const loginSuccess = createAction(
  '[Auth Signin] Login success',
  (response: IAuthLoginResponse | IAuthRefreshTokenResponse, redirectTo: string | null = '/') => ({response, redirectTo})
  // props<{response: IAuthLoginResponse, redirectTo?: string }>()
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