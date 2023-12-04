import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CombinedReducers } from '../../store';
import { userReducerAction } from '../../store/user/user.actions';
import { NewUser } from '../../types/api';

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

  constructor(private fb: FormBuilder, private store: Store<CombinedReducers>) {
  }

  ngOnInit() {
    this.initForm();
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
