import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LayoutComponent } from '../../shared/layout/layout.component';
import { Store } from '@ngrx/store';
import { CombinedReducers } from '../../store';
import { offersReducerAction } from '../../store/offers/offers.actions';
import { ActivatedRoute } from '@angular/router';
import { offersReducerSelector } from '../../store/offers/offers.selectors';
import { userReducerSelector } from '../../store/user/user.selectors';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentsComponent } from './components/comments/comments.component';
import { userReducerAction } from '../../store/user/user.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-offer-page',
  standalone: true,
  imports: [CommonModule, LayoutComponent, NgOptimizedImage, CommentFormComponent, CommentsComponent],
  templateUrl: './offer-page.component.html',
  styleUrl: './offer-page.component.scss',
})
export class OfferPageComponent implements OnInit {
  offer$ = this.store.select(offersReducerSelector.selectOffer);
  user$ = this.store.select(userReducerSelector.selectUser);
  updateResult$ = this.store.select(userReducerSelector.selectUserUpdateResult);

  roomsToNameMap = {
    '=0': 'Bedrooms',
    '=1': 'Bedroom',
    '=2': 'Bedrooms',
    'other': 'Bedrooms',
  };

  adultsToNameMap = {
    '=0': 'adults',
    '=1': 'adult',
    '=2': 'adults',
    'other': 'adults',
  };

  constructor(
    private store: Store<CombinedReducers>,
    private route: ActivatedRoute,
  ) {

    this.updateResult$.pipe(takeUntilDestroyed())
      .subscribe(result => {
        if (result) {
          this.store.dispatch((offersReducerAction.getOffer({ id: this.route.snapshot.params['id'] })));
        }
      });
  }

  ngOnInit() {
    this.store.dispatch((offersReducerAction.getOffer({ id: this.route.snapshot.params['id'] })));
    this.store.dispatch((offersReducerAction.getComments({ id: this.route.snapshot.params['id'] })));
  }

  getRatingStyle(rating: number): Partial<CSSStyleDeclaration> {
    return { width: `${(100 * rating) / 5}%` };
  }

  handleFavoriteClick(id: number, isFavorite: boolean) {
    this.store.dispatch(userReducerAction.updateFavorites({
      id: id.toString(),
      status: Number(!isFavorite),
    }));
  }



}
