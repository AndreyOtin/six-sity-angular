import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { CombinedReducers } from '../../store';
import { userReducerSelector } from '../../store/user/user.selectors';
import { Router, RouterLink } from '@angular/router';
import { userReducerAction } from '../../store/user/user.actions';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  @Input() className: string = '';
  user$ = this.store.select(userReducerSelector.selectUser);
  userStatus$ = this.store.select(userReducerSelector.selectUserStatus);
  favorites$ = this.store.select(userReducerSelector.selectUserFavorites);

  constructor(private store: Store<CombinedReducers>, public route: Router) {
  }

  ngOnInit() {
  }

  handleLogout() {
    this.store.dispatch(userReducerAction.logoutUser());
  }
}
