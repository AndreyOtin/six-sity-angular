import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CombinedReducers } from '../../../store';
import { userReducerSelector } from '../../../store/user/user.selectors';
import { map } from 'rxjs';

export const favoritePageGuard: CanActivateFn = () => {
  const store = inject(Store<CombinedReducers>);
  const router = inject(Router);

  return store.select(userReducerSelector.selectUser).pipe(map((user) => {
    if (!user) {
      return router.createUrlTree(['/login']);
    }

    return true;
  }));
};
