import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CombinedReducers } from '../../../store';
import { userReducerSelector } from '../../../store/user/user.selectors';
import { map } from 'rxjs';

export const loginPageGuard:CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store<CombinedReducers>);

  return store.select(userReducerSelector.selectUser).pipe(map((user) => {
    if (user) {
      return router.createUrlTree(['/offers']);
    }

    return true;
  }));
};
