import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { CombinedReducers } from '../../store';

import { OfferCardComponent } from '../../shared/offer-card/offer-card.component';
import { Offer } from '../../types/api';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { map, mergeAll, Observable } from 'rxjs';
import { LayoutComponent } from '../../shared/layout/layout.component';
import { SortMenuComponent } from './componets/sort-menu/sort-menu.component';
import { offersReducerSelector } from '../../store/offers/offers.selectors';
import { offersReducerAction } from '../../store/offers/offers.actions';
import { sortBy } from '../../utils/sort';
import { userReducerAction } from '../../store/user/user.actions';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    OfferCardComponent,
    RouterLink,
    RouterLinkActive,
    LayoutComponent,
    SortMenuComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  offers$ = this.store.select(offersReducerSelector.selectOffers);
  sort$ = this.store.select(offersReducerSelector.selectSort);
  city$: Observable<string> = this.route.params.pipe(map((param) => param['city'] || 'paris'));

  offersByCity$ = this.offers$.pipe(
    map((offers) => {
      return this.city$.pipe(
        map((city) => offers.filter((o) => o.city.name.toLowerCase() === city)),
      );
    }),
    mergeAll(),
    map((offers) => {
      return this.sort$.pipe(map((sort) => offers.slice().sort(sortBy[sort])));
    }),
    mergeAll(),
  );

  constructor(
    private store: Store<CombinedReducers>,
    private route: ActivatedRoute,
  ) {
  }

  trackOffers(_: any, item: Offer) {
    return item.id;
  }

  ngOnInit() {
    this.store.dispatch(offersReducerAction.getOffers());
    this.store.dispatch(userReducerAction.checkUser());
    console.log('main');
  }

  handleCityClick() {
    this.store.dispatch(offersReducerAction.changeSort({ sort: 'popular' }));
  }
}
