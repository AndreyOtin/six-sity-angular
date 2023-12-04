import { Routes } from '@angular/router';
import { MainPageComponent } from '../pages/main-page/main-page.component';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { loginPageGuard } from '../pages/login-page/guard/login-page.guard';

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
    path: '**',
    redirectTo: 'offers/paris',
    title: '6 городов',
  },
];