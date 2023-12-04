import { createAction, props } from '@ngrx/store';
import { Offer } from '../../types/api';
import { OffersReducer } from './offers.reducer';
import { ReducerName } from '../../consts/enums';

export const changeSort = createAction(`${ReducerName.Offers}/changeSort`, props<{ sort: OffersReducer['sort'] }>());
const getOffers = createAction(`${ReducerName.Offers}/getOffers`);
const getOffersSuccess = createAction(
  `${ReducerName.Offers}/getOffersSuccess`,
  props<{ payload: Offer[] }>(),
);
const getOffersFail = createAction(
  `${ReducerName.Offers}/getOffersFailure`,
  props<{ payload: any }>(),
);

export const offersReducerAction = {
  getOffers,
  changeSort,
  getOffersSuccess,
  getOffersFail
};
