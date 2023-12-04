import { Offer } from '../types/api';
import { SORT_TYPE } from '../consts/app';

export const sortBy: Record<typeof SORT_TYPE[number], ((a: Offer, b: Offer) => number)> = {
  popular: ()=> 0,
  'high-price': (a, b)=> b.price - a.price,
  'low-price': (a, b)=> a.price - b.price,
  'top-rated': (a, b)=> b.rating - a.rating
};
