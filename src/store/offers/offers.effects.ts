import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { catchError, map, mergeAll, of } from 'rxjs';
import { offersReducerAction } from './offers.actions';
import { HttpErrorResponse } from '@angular/common/http';

export const getOffersEffect = createEffect(
  ($actions = inject(Actions), apiService = inject(ApiService)) => {

    return $actions.pipe(
      ofType(offersReducerAction.getOffers),
      map(() => {
        return apiService.getOffers().pipe(
          map((offers) => offersReducerAction.getOffersSuccess({ payload: offers })),
          catchError((err:HttpErrorResponse) => of(offersReducerAction.getOffersFail({ payload: err }))),
        );
      }),
      mergeAll(),
    );
  },
  { functional: true },
);


export const getOfferEffect = createEffect(
  ($actions = inject(Actions), apiService = inject(ApiService)) => {

    return $actions.pipe(
      ofType(offersReducerAction.getOffer),
      map(({ id }) => {
        return apiService.getOffer(id).pipe(
          map((offer) => offersReducerAction.getOfferSuccess({ payload: offer })),
          catchError((err:HttpErrorResponse) => of(offersReducerAction.getOfferFail({ payload: err.status }))),
        );
      }),
      mergeAll(),
    );
  },
  { functional: true },
);

export const getCommentsEffect = createEffect(
  ($actions = inject(Actions), apiService = inject(ApiService)) => {

    return $actions.pipe(
      ofType(offersReducerAction.getComments),
      map(({ id }) => {
        return apiService.getComments(id).pipe(
          map((offer) => offersReducerAction.getCommentsSuccess({ payload: offer })),
          catchError((err:HttpErrorResponse) => of(offersReducerAction.getCommentsFail({ payload: err.status }))),
        );
      }),
      mergeAll(),
    );
  },
  { functional: true },
);

export const postCommentEffect = createEffect(
  ($actions = inject(Actions), apiService = inject(ApiService)) => {

    return $actions.pipe(
      ofType(offersReducerAction.postComment),
      map(({ id, comment}) => {
        return apiService.postComment(id, comment ).pipe(
          map((comments) => offersReducerAction.postCommentSuccess({ payload: comments })),
          catchError((err:HttpErrorResponse) => of(offersReducerAction.postCommentsFail({ payload: err.status }))),
        );
      }),
      mergeAll(),
    );
  },
  { functional: true },
);
