import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Offer} from '../../types/api';

@Component({
  selector: 'app-offer-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCardComponent implements OnInit {
  @Input() offer!: Offer;

  get ratingStyle(): Partial<CSSStyleDeclaration> {
    return { width: `${(100 * this.offer.rating) / 5}%` };
  }

  ngOnInit() {}
}
