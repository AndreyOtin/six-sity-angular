import { ActionReducerMap } from '@ngrx/store';
import { offersReducer, OffersReducer } from './offers/offers.reducer';
import { getCommentsEffect, getOfferEffect, getOffersEffect, postCommentEffect } from './offers/offers.effects';
import { ReducerName } from '../consts/enums';
import { userReducer, UserReducer } from './user/user.reducer';
import {
  checkUserEffect,
  getFavoritesEffect,
  loginUserEffect,
  logoutUserEffect,
  updateFavoritesEffect,
} from './user/user.effects';

export type CombinedReducers = {
  [ReducerName.Offers]: OffersReducer;
  [ReducerName.User]: UserReducer
};

export const appEffects = {
  getOffersEffect,
  checkUserEffect,
  loginUserEffect,
  logoutUserEffect,
  getFavoritesEffect,
  updateFavoritesEffect,
  getOfferEffect,
  getCommentsEffect,
  postCommentEffect
};

export const combinedReducers: ActionReducerMap<CombinedReducers> = {
  [ReducerName.Offers]: offersReducer,
  [ReducerName.User]: userReducer,
};
