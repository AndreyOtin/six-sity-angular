import { CombinedReducers } from '../index';
import { ReducerName } from '../../consts/enums';


const selectOffers = (state: CombinedReducers) =>
  state[ReducerName.Offers].offers;
const selectSort = (state: CombinedReducers) => state[ReducerName.Offers].sort;
const selectOffersState = (state: CombinedReducers) =>
  state[ReducerName.Offers].isLoading;

export const offersReducerSelector = {
  selectOffers,
  selectOffersState,
  selectSort,
};
