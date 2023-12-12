import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LayoutComponent } from '../../shared/layout/layout.component';
import { Offer } from '../../types/api';
import { Store } from '@ngrx/store';
import { CombinedReducers } from '../../store';
import { userReducerSelector } from '../../store/user/user.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { userReducerAction } from '../../store/user/user.actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite-page',
  standalone: true,
  imports: [CommonModule, LayoutComponent, NgOptimizedImage, RouterLink],
  templateUrl: './favorite-page.component.html',
  styleUrl: './favorite-page.component.scss',
})
export class FavoritePageComponent implements OnInit {
  favorites = {} as Record<string, Offer[]>;
  protected readonly Object = Object;

  constructor(private store: Store<CombinedReducers>) {
    this.handleFavoritesSubscription();
  }

  ngOnInit() {
  }

  private handleFavoritesSubscription() {
    this.store.select(userReducerSelector.selectUserFavorites)
      .pipe(takeUntilDestroyed())
      .subscribe(offers => {
        offers.reduce((acc, offer) => {
          const name = offer.city.name;

          if (acc[name]) {
            acc[name].push(offer);
          } else {
            acc[name] = [offer];
          }

          return acc;
        }, this.favorites);
      });
  }

  getRatingStyle(rating: number): Partial<CSSStyleDeclaration> {
    return { width: `${(100 * rating) / 5}%` };
  }

  handleFavoriteClick(id: number, isFavorite: boolean) {
    this.store.dispatch(userReducerAction.updateFavorites({ id: id.toString(), status: Number(!isFavorite) }));
  }
}
