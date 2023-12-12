import { Injectable } from '@angular/core';
import { NavigationCancel, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteService  {
  from = '';

  constructor(private router: Router) {
    this.init()
  }

  init() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationCancel),
    ).subscribe((e) => {
      if (e instanceof NavigationCancel) {
        this.from = e.url;
      }
    });
  }
}
