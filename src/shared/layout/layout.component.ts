import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { CombinedReducers } from '../../store';
import { userReducerSelectors } from '../../store/user/user.selectors';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  user$ = this.store.select(userReducerSelectors.selectUser);

  constructor(private store: Store<CombinedReducers>) {
  }

  ngOnInit() {
  }
}
