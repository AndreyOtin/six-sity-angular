import { Routes } from '@angular/router';
import { MainPageComponent } from '../pages/main-page/main-page.component';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { loginPageGuard } from '../pages/login-page/guard/login-page.guard';
import { OfferPageComponent } from '../pages/offer-page/offer-page.component';
import { favoritePageGuard } from '../pages/favorite-page/guards/favorite-page.guard';
import { FavoritePageComponent } from '../pages/favorite-page/favorite-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'offers/paris',
    pathMatch: 'full',
  },
  {
    path: 'offers/:city',
    component: MainPageComponent,
    title: '6 городов',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: '6 городов',
    canActivate: [loginPageGuard],
  },
  {
    path: 'favorites',
    component: FavoritePageComponent,
    title: '6 городов',
    canActivate: [favoritePageGuard],
  },
  {
    path: 'offer/:id',
    component: OfferPageComponent,
    title: '6 городов',
  },
  {
    path: '**',
    redirectTo: 'offers/paris',
    title: '6 городов',
  },
];
