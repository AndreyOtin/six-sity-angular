import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SORT_TYPE, sortTypeToName } from '../../../../consts/app';
import { Store } from '@ngrx/store';
import { CombinedReducers } from '../../../../store';
import { offersReducerAction } from '../../../../store/offers/offers.actions';
import { offersReducerSelector } from '../../../../store/offers/offers.selectors';

@Component({
  selector: 'app-sort-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sort-menu.component.html',
  styleUrl: './sort-menu.component.scss',
})
export class SortMenuComponent implements OnInit{
  isMenuOpened = false;
  activeSort$ = this.store.select(offersReducerSelector.selectSort);
  menuItems = SORT_TYPE;
  menuItemsMap = sortTypeToName;

  constructor(private store: Store<CombinedReducers>) {
  }

  ngOnInit() {}

  handleSortClick() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  handleSortItemClick(sort: CombinedReducers['offersReducer']['sort']) {
    this.isMenuOpened = false;
    this.store.dispatch(offersReducerAction.changeSort({sort}))
  }
}
