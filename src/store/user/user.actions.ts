import { createAction, props } from '@ngrx/store';
import { ReducerName } from '../../consts/enums';
import { NewUser, Offer, User } from '../../types/api';

const checkUser = createAction(`${ReducerName.User}/checkUser`);
const checkUserSuccess = createAction(`${ReducerName.User}/checkUserSuccess`, props<{payload: User}>());
const checkUserFailure = createAction(`${ReducerName.User}/checkUserFailure`, props<{ payload: string }>());

const loginUser = createAction(`${ReducerName.User}/loginUser`, props<NewUser>());
const loginUserSuccess = createAction(`${ReducerName.User}/loginUserSuccess`, props<{payload: User}>());
const loginUserFailure = createAction(`${ReducerName.User}/loginUserFailure`, props<{ payload: string }>());

const logoutUser = createAction(`${ReducerName.User}/logoutUser`);
const logoutUserSuccess = createAction(`${ReducerName.User}/logoutUserSuccess`);
const logoutUserFailure = createAction(`${ReducerName.User}/logoutUserFailure`, props<{ payload: string }>());

const getFavorites = createAction(`${ReducerName.User}/getFavorites`);
const getFavoritesSuccess = createAction(`${ReducerName.User}/getFavoritesSuccess`, props<{ payload: Offer[] }>());
const getFavoritesFailure = createAction(`${ReducerName.User}/getFavoritesFailure`, props<{ payload: string }>());

export const userReducerAction = {
  checkUser,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  logoutUserSuccess,
  logoutUserFailure,
  checkUserSuccess,
  checkUserFailure,
  getFavorites,
  getFavoritesSuccess,
  getFavoritesFailure
};
