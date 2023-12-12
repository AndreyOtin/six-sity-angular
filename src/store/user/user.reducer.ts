import { Offer, User } from '../../types/api';
import { createReducer, on } from '@ngrx/store';

import { UserStatus } from '../../consts/enums';
import { userReducerAction } from './user.actions';

export interface UserReducer {
  user: User | null;
  favorites: Offer[];
  authStatus: UserStatus;
  isLoading: boolean,
  isFavoritesLoading: boolean,
  error: string | null,
  isUpdateSuccess: boolean;
}

const initialState: UserReducer = {
  favorites: [],
  user: null,
  authStatus: UserStatus.Unknown,
  isLoading: false,
  isFavoritesLoading: false,
  isUpdateSuccess: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(userReducerAction.checkUserSuccess, (state, action) => {
    return { ...state, user: action.payload, authStatus: UserStatus.Auth };
  }),
  on(userReducerAction.checkUserFailure, (state) => {
    return { ...state, authStatus: UserStatus.NoAuth };
  }),
  on(userReducerAction.getFavorites, (state) => {
    return { ...state, isFavoritesLoading: true, error: null };
  }),
  on(userReducerAction.getFavoritesSuccess, (state, action) => {
    return { ...state, favorites: action.payload, isFavoritesLoading: false };
  }),
  on(userReducerAction.getFavoritesFailure, (state, action) => {
    return { ...state, isFavoritesLoading: false, error: action.payload };
  }),
  on(userReducerAction.updateFavorites, (state) => {
    return { ...state, isFavoritesLoading: true, error: null, isUpdateSuccess: false };
  }),
  on(userReducerAction.updateFavoritesSuccess, (state, action) => {
    const index = state.favorites.findIndex(f => f.id === action.payload.id);
    const favorites = state.favorites.slice();

    if (index === -1) {
      favorites.push(action.payload);
    } else {
      favorites.splice(index, 1);
    }

    return { ...state, favorites: favorites, isFavoritesLoading: false, isUpdateSuccess: true };
  }),
  on(userReducerAction.updateFavoritesFailure, (state, action) => {
    return { ...state, isFavoritesLoading: false, error: action.payload };
  }),
  on(userReducerAction.loginUser, (state) => {
    return { ...state, isLoading: true, error: null };
  }),
  on(userReducerAction.loginUserSuccess, (state, action) => {
    localStorage.setItem('user', action.payload.token);

    return { ...state, user: action.payload, isLoading: false, authStatus: UserStatus.Auth };
  }),
  on(userReducerAction.loginUserFailure, (state, action) => {
    return { ...state, isLoading: false, error: action.payload };
  }),
  on(userReducerAction.logoutUser, (state) => {
    return { ...state, isLoading: true, error: null };
  }),
  on(userReducerAction.logoutUserSuccess, (state) => {
    localStorage.removeItem('user');

    return { ...state, user: null, isLoading: false, authStatus: UserStatus.NoAuth };
  }),
  on(userReducerAction.logoutUserFailure, (state, action) => {
    return { ...state, isLoading: false, error: action.payload };
  }),
);
