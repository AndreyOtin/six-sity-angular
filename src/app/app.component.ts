import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { offersReducerAction } from '../store/offers/offers.actions';
import { userReducerAction } from '../store/user/user.actions';
import { Store } from '@ngrx/store';
import { CombinedReducers } from '../store';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<CombinedReducers>,
  ) {

  }

  ngOnInit() {
    this.store.dispatch(offersReducerAction.getOffers());
    this.store.dispatch(userReducerAction.checkUser());
  }
}
