import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Offer } from '../../types/api';
import { Store } from '@ngrx/store';
import { CombinedReducers } from '../../store';
import { userReducerSelector } from '../../store/user/user.selectors';
import { userReducerAction } from '../../store/user/user.actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-offer-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferCardComponent implements OnInit {
  @Input() offer!: Offer;
  user$ = this.store.select(userReducerSelector.selectUser);

  constructor(private store: Store<CombinedReducers>) {
  }

  get ratingStyle(): Partial<CSSStyleDeclaration> {
    return { width: `${(100 * this.offer.rating) / 5}%` };
  }

  ngOnInit() {
  }

  handleFavoriteClick() {
    this.store.dispatch(userReducerAction.updateFavorites({
      id: this.offer.id.toString(),
      status: Number(!this.offer.isFavorite),
    }));
  }
}
