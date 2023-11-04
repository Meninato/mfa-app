import { IAuthForgotPasswordRequest, IAuthLoginRequest, IAuthLoginResponse, IAuthRefreshTokenResponse, IAuthRegisterRequest, IAuthResetPasswordRequest, IAuthSigninWithTokenResponse, IAuthVerifyEmailRequest } from "@app/core/models/api/account.model";
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

export const recoverPassword = createAction(
  '[Auth] Forgot password request',
  props<{request: IAuthForgotPasswordRequest}>()
);

export const recoverPasswordSuccess = createAction(
  '[Auth] Forgot password success',
  props<{text: string}>()
);

export const recoverPasswordFailure = createAction(
  '[Auth] Forgot password failure',
  props<{error: string}>()
);

export const resetPassword = createAction(
  '[Auth] Reset password',
  props<{request: IAuthResetPasswordRequest}>()
);

export const resetPasswordSuccess = createAction(
  '[Auth] Reset password success',
  props<{text: string}>()
);

export const resetPasswordFailure = createAction(
  '[Auth] Reset password failure',
  props<{error: string}>()
);

export const register = createAction(
  '[Auth Signup] Register',
  props<{request: IAuthRegisterRequest}>()
);

export const registerSuccess = createAction(
  '[Auth Signup] Register success',
  props<{text: string}>()
);

export const registerFailure = createAction(
  '[Auth Signup] Register failure',
  props<{error: string}>()
);

export const verifyEmail = createAction(
  '[Auth Verify Email] Verify Email',
  props<{request: IAuthVerifyEmailRequest}>()
);

export const verifyEmailSuccess = createAction(
  '[Auth Verify Email] Verify Email Success',
  props<{text: string}>()
);