import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from '@app/core/store/auth';

export interface IAppState {
  auth: fromAuth.AuthReducer.IAuthState
}

export const appReducer: ActionReducerMap<IAppState> = {
  auth: fromAuth.AuthReducer.authReducer
}