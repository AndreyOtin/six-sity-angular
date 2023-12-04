import { createReducer, on } from '@ngrx/store';
import { Offer } from '../../types/api';
import { SORT_TYPE } from '../../consts/app';
import { offersReducerAction } from './offers.actions';

export interface OffersReducer {
  sort: typeof SORT_TYPE[number];
  offers: Offer[];
  err: any | null;
  isLoading: boolean;
}

const initialState: OffersReducer = {
  offers: [],
  err: null,
  isLoading: false,
  sort: 'popular',
};

export const offersReducer = createReducer(
  initialState,
  on(offersReducerAction.changeSort, (state, action) => {
    return { ...state, sort: action.sort };
  }),
  on(offersReducerAction.getOffersSuccess, (state, action) => {
     return { ...state, offers: action.payload, isLoading: false };
  }),
  on(offersReducerAction.getOffers, (state) => {
    return {...state, isLoading: true};
  }),
  on(offersReducerAction.getOffersFail, (state, action) => {
    return { ...state, err: action.payload, isLoading: false };
  }),
);
