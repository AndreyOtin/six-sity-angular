import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { CombinedReducers } from '../../store';
import { userReducerSelector } from '../../store/user/user.selectors';
import { Router, RouterLink } from '@angular/router';
import { userReducerAction } from '../../store/user/user.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserStatus } from '../../consts/enums';
import { RouteService } from '../../services/route.service';

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
  authStatus$ = this.store.select(userReducerSelector.selectUserStatus);

  constructor(private store: Store<CombinedReducers>, public router: Router, private routeService: RouteService ) {
    this.handleUserStatusSubscription();
  }

  ngOnInit() {
  }

  private handleUserStatusSubscription() {
    this.authStatus$.pipe(takeUntilDestroyed()).subscribe(status => {
      if (status === UserStatus.NoAuth) {
        if (this.router.url === '/favorites') {
          void this.router.navigate(['/login']);
          this.routeService.from = '/favorites'
        }
      }
    });
  }

  handleLogout() {
    this.store.dispatch(userReducerAction.logoutUser());
  }
}
