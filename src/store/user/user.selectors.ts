import { CombinedReducers } from '../index';
import { ReducerName } from '../../consts/enums';

const selectUser = (state: CombinedReducers) => state[ReducerName.User].user;
const selectUserStatus = (state: CombinedReducers) => state[ReducerName.User].authStatus;
const selectUserFavorites = (state: CombinedReducers) => state[ReducerName.User].favorites;
const selectUserUpdateResult = (state: CombinedReducers) => state[ReducerName.User].isUpdateSuccess;


export const userReducerSelector = {
  selectUser,
  selectUserStatus,
  selectUserFavorites,
  selectUserUpdateResult
}
