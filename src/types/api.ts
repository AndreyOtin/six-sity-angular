export interface Offer {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: Host;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: OfferLocation;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}

export interface City {
  location: OfferLocation;
  name: string;
}

export interface OfferLocation {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface Host {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export interface User {
  avatarUrl: string
  email: string
  id: number
  isPro: boolean
  name: string
  token: string
}

export interface NewUser {
  email: string
  password: string
}

export interface Comment {
  comment: string
  date: string
  id: number
  rating: number
  user: CommentUser
}

export interface CommentUser {
  avatarUrl: string
  id: number
  isPro: boolean
  name: string
}

export interface NewComment {
  comment: string
  rating: number
}
