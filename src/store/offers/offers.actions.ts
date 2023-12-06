import { createAction, props } from '@ngrx/store';
import { Comment, NewComment, Offer } from '../../types/api';
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

const getOffer = createAction(`${ReducerName.Offers}/getOffer`, props<{ id: string }>());
const getOfferSuccess = createAction(
  `${ReducerName.Offers}/getOfferSuccess`,
  props<{ payload: Offer }>(),
);
const getOfferFail = createAction(
  `${ReducerName.Offers}/getOfferFail`,
  props<{ payload: any }>(),
);

const getComments = createAction(`${ReducerName.Offers}/getComments`, props<{ id: string }>());
const getCommentsSuccess = createAction(
  `${ReducerName.Offers}/getCommentsSuccess`,
  props<{ payload: Comment[] }>(),
);
const getCommentsFail = createAction(
  `${ReducerName.Offers}/getCommentsFail`,
  props<{ payload: any }>(),
);

const postComment = createAction(`${ReducerName.Offers}/postComment`, props<{ id: string, comment: NewComment }>());
const postCommentSuccess = createAction(
  `${ReducerName.Offers}/postCommentSuccess`,
  props<{ payload: Comment[] }>(),
);
const postCommentsFail = createAction(
  `${ReducerName.Offers}/postCommentsFail`,
  props<{ payload: any }>(),
);

export const offersReducerAction = {
  getOffers,
  changeSort,
  getOffersSuccess,
  getOffersFail,
  getOffer,
  getOfferSuccess,
  getOfferFail,
  getComments,
  getCommentsSuccess,
  getCommentsFail,
  postComment,
  postCommentSuccess,
  postCommentsFail
};
