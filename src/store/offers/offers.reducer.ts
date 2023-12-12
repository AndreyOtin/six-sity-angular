import { createReducer, on } from '@ngrx/store';
import { Comment, Offer } from '../../types/api';
import { SORT_TYPE } from '../../consts/app';
import { offersReducerAction } from './offers.actions';
import { FormStatus } from '../../consts/enums';

export interface OffersReducer {
  sort: typeof SORT_TYPE[number];
  offers: Offer[];
  offer: Offer | null;
  err: any | null;
  isLoading: boolean;
  comments: Comment[],
  formStatus: FormStatus
}

const initialState: OffersReducer = {
  offers: [],
  offer: null,
  err: null,
  isLoading: false,
  sort: 'popular',
  comments: [],
  formStatus: FormStatus.Unknown,
};

export const offersReducer = createReducer(
  initialState,
  on(offersReducerAction.getComments, (state) => {
    return { ...state, isLoading: true, err: null };
  }),
  on(offersReducerAction.getCommentsSuccess, (state, action) => {
    return { ...state, isLoading: false, comments: action.payload };
  }),
  on(offersReducerAction.getCommentsFail, (state, action) => {
    return { ...state, isLoading: false, err: action.payload };
  }),
  on(offersReducerAction.postComment, (state) => {
    return { ...state, isLoading: true, err: null, formStatus: FormStatus.Unknown};
  }),
  on(offersReducerAction.postCommentSuccess, (state, action) => {
    return { ...state, isLoading: false, comments: action.payload, formStatus: FormStatus.Success };
  }),
  on(offersReducerAction.postCommentsFail, (state, action) => {
    return { ...state, isLoading: false, err: action.payload };
  }),
  on(offersReducerAction.getOffer, (state) => {
    return { ...state, isLoading: true, err: null };
  }),
  on(offersReducerAction.getOfferSuccess, (state, action) => {
    return { ...state, isLoading: false, offer: action.payload };
  }),
  on(offersReducerAction.getOfferFail, (state, action) => {
    return { ...state, isLoading: false, err: action.payload };
  }),
  on(offersReducerAction.changeSort, (state, action) => {
    return { ...state, sort: action.sort };
  }),
  on(offersReducerAction.getOffersSuccess, (state, action) => {
    return { ...state, offers: action.payload, isLoading: false };
  }),
  on(offersReducerAction.getOffers, (state) => {
    return { ...state, isLoading: true, err: null };
  }),
  on(offersReducerAction.getOffersFail, (state, action) => {
    return { ...state, err: action.payload, isLoading: false };
  }),
);
