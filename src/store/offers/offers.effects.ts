import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { catchError, map, mergeAll, of } from 'rxjs';
import { offersReducerAction } from './offers.actions';

export const getOffersEffect = createEffect(
  ($actions = inject(Actions), apiService = inject(ApiService)) => {

    return $actions.pipe(
      ofType(offersReducerAction.getOffers),
      map(() => {
        return apiService.getOffers().pipe(
          map((offers) => offersReducerAction.getOffersSuccess({ payload: offers })),
          catchError((err) => of(offersReducerAction.getOffersFail({ payload: err }))),
        );
      }),
      mergeAll(),
    );
  },
  { functional: true },
);
