import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { catchError, map, mergeAll, of } from 'rxjs';
import { userReducerAction } from './user.actions';
import { HttpErrorResponse } from '@angular/common/http';

export const checkUserEffect = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {

    return actions$.pipe(
      ofType(userReducerAction.checkUser),
      map(() => {
        return apiService.getUser().pipe(
          map((user) => {
            return [userReducerAction.checkUserSuccess({ payload: user }), userReducerAction.getFavorites()]
          }),
          mergeAll(),
          catchError((err: HttpErrorResponse) => of(userReducerAction.checkUserFailure({ payload: err.error.error }))),
        );
      }),
      mergeAll(),
    );
  },
  { functional: true },
);

export const loginUserEffect = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {

    return actions$.pipe(
      ofType(userReducerAction.loginUser),
      map((user) => {
        return apiService.login({ email: user.email, password: user.password }).pipe(
          map((user) => userReducerAction.loginUserSuccess({ payload: user })),
          catchError((err: HttpErrorResponse) => of(userReducerAction.logoutUserFailure({ payload: err.error.error }))),
        );
      }),
      mergeAll(),
    );
  },
  { functional: true },
);

export const logoutUserEffect = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {

    return actions$.pipe(
      ofType(userReducerAction.logoutUser),
      map(() => {
        return apiService.logout().pipe(
          map(() => userReducerAction.logoutUserSuccess()),
          catchError((err: HttpErrorResponse) => of(userReducerAction.logoutUserFailure({ payload: err.error.error }))),
        );
      }),
      mergeAll(),
    );
  },
  { functional: true },
);

export const getFavoritesEffect = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {

    return actions$.pipe(
      ofType(userReducerAction.getFavorites),
      map(() => {
        return apiService.getFavorites().pipe(
          map((offers) => userReducerAction.getFavoritesSuccess({ payload: offers })),
          catchError((err: HttpErrorResponse) => of(userReducerAction.getFavoritesFailure({ payload: err.error.error }))),
        );
      }),
      mergeAll(),
    );
  },
  { functional: true },
);
