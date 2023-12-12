export enum ApiRoute {
  Offers = 'hotels',
  Comments = 'comments',
  Login = 'login',
  Logout = 'logout',
  Favorite = 'favorite'
}

export enum ReducerName {
  Offers = 'offersReducer',
  User = 'userReducer'
}

export enum UserStatus {
  Auth,
  NoAuth,
  Unknown
}

export enum FormStatus {
  Unknown,
  Success
}
