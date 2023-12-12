import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CombinedReducers } from '../../../../store';
import { offersReducerAction } from '../../../../store/offers/offers.actions';
import { NewComment } from '../../../../types/api';
import { offersReducerSelector } from '../../../../store/offers/offers.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormStatus } from '../../../../consts/enums';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
})
export class CommentFormComponent implements OnInit {
  @Input() id!: number;
  form!: FormGroup<{
    rating: FormControl<string | null>
    comment: FormControl<string | null>
  }>;

  constructor(private fb: FormBuilder, private store: Store<CombinedReducers>) {
    this.handleFormStatusSubscription();
  }

  ngOnInit() {
    this.initFom();
  }

  private handleFormStatusSubscription() {
    this.store.select(offersReducerSelector.selectOffersCommentFormStatus)
      .pipe(takeUntilDestroyed())
      .subscribe((status) => {
        if (status === FormStatus.Success) {
          this.form.reset();
        }
      });
  }

  private initFom() {
    this.form = this.fb.group({
      comment: ['', Validators.compose([Validators.required, Validators.minLength(50)])],
      rating: ['', Validators.required],
    });
  }

  handleSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(offersReducerAction.postComment({
      id: this.id.toString(),
      comment: this.form.value as NewComment,
    }));
  }
}
