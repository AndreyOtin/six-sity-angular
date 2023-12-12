import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CombinedReducers } from '../../store';
import { userReducerAction } from '../../store/user/user.actions';
import { NewUser } from '../../types/api';
import { userReducerSelector } from '../../store/user/user.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserStatus } from '../../consts/enums';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup<{
    email: FormControl<string | null>,
    password: FormControl<string | null>
  }>;
  userStatus$ = this.store.select(userReducerSelector.selectUserStatus);
  from = this.router.getCurrentNavigation()?.extras.state?.['from'] as string | undefined;

  constructor(
    private fb: FormBuilder,
    private store: Store<CombinedReducers>,
    private router: Router,
    private routeService: RouteService
  ) {
    this.handleUserStatusSubscription();
  }

  ngOnInit() {
    this.initForm();
  }

  private handleUserStatusSubscription() {
    this.userStatus$.pipe(takeUntilDestroyed()).subscribe((userStatus) => {
      if (userStatus === UserStatus.Auth) {
        void this.router.navigate([this.routeService.from || this.from || '/']);
        this.routeService.from = ''
      }
    });
  }

  private initForm() {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(3)],
    });
  }

  handleSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(userReducerAction.loginUser(this.form.value as NewUser));
  }
}
