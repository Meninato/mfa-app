import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from './auth.reducer';

export const selectAuth = createFeatureSelector<fromAuth.IAuthState>(fromAuth.AUTH_FEATURE_KEY);

export const selectAuthToken = createSelector(
  selectAuth,
  (state) => state.token
);

export const selectAuthUser = createSelector(
  selectAuth,
  (state) => state.user
);
