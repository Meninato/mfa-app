import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from './auth.reducer';

export const selectAuth = createFeatureSelector<fromAuth.IAuthState>(fromAuth.AUTH_FEATURE_KEY);

export const selectAuthUser = createSelector(
  selectAuth,
  (state) => state.user
);

export const selectAuthIsLoading = createSelector(
  selectAuth,
  (state) => state.loading
)

export const selectAuthIsAuthenticated = createSelector(
  selectAuth,
  (state) => !!state.user
)
