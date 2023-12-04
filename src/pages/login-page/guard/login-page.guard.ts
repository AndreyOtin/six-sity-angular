import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CombinedReducers } from '../../../store';
import { userReducerSelectors } from '../../../store/user/user.selectors';
import { map } from 'rxjs';

export const loginPageGuard = (route: Parameters<CanActivateFn>[0]) => {
  const router = inject(Router);
  const store = inject(Store<CombinedReducers>);

  return store.select(userReducerSelectors.selectUser).pipe(map((user) => {
    if (user) {
      return router.createUrlTree(['/offers']);
    }

    return true;
  }));
};
