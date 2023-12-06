import { CombinedReducers } from '../index';
import { ReducerName } from '../../consts/enums';


const selectOffers = (state: CombinedReducers) =>
  state[ReducerName.Offers].offers;
const selectOffersCommentFormStatus = (state: CombinedReducers) =>
  state[ReducerName.Offers].formStatus;
const selectComments = (state: CombinedReducers) =>
  state[ReducerName.Offers].comments;
const selectOffer = (state: CombinedReducers) =>
  state[ReducerName.Offers].offer;
const selectSort = (state: CombinedReducers) => state[ReducerName.Offers].sort;
const selectOffersState = (state: CombinedReducers) =>
  state[ReducerName.Offers].isLoading;

export const offersReducerSelector = {
  selectOffers,
  selectOffersState,
  selectSort,
  selectOffer,
  selectComments,
  selectOffersCommentFormStatus
};
