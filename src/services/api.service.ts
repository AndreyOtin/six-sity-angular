import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment, NewComment, NewUser, Offer, User } from '../types/api';
import { ApiRoute } from '../consts/enums';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  getOffers() {
    return this.http.get<Offer[]>(ApiRoute.Offers);
  }

  getFavorites() {
    return this.http.get<Offer[]>(ApiRoute.Favorite);
  }

  updateFavorites(hotelId: string, status: number) {
    return this.http.get<Offer[]>(`${ApiRoute.Favorite}/${hotelId}/${status}`);
  }

  getComments(hotelId: string) {
    return this.http.get<Offer[]>(`${ApiRoute.Comments}/${hotelId}`);
  }

  postComment(hotelId: string, comment: NewComment) {
    return this.http.post<Comment[]>(`${ApiRoute.Comments}/${hotelId}`, comment);
  }

  getUser() {
    return this.http.get<User>(ApiRoute.Login);
  }

  login(user: NewUser) {
    return this.http.post<User>(ApiRoute.Login, user);
  }

  logout() {
    return this.http.delete(ApiRoute.Logout);
  }
}
