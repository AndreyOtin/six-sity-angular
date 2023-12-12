import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { offersReducerSelector } from '../../../../store/offers/offers.selectors';
import { Store } from '@ngrx/store';
import { CombinedReducers } from '../../../../store';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  comments$ = this.store.select(offersReducerSelector.selectComments);

  constructor(private store: Store<CombinedReducers>) {
  }

  getRatingStyle(rating: number): Partial<CSSStyleDeclaration> {
    return { width: `${(100 * rating) / 5}%` };
  }
}
