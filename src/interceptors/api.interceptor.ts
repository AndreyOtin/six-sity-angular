import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { API_BASE_URL } from '../consts/app';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const clone = req.clone({
    url: `${API_BASE_URL}/${req.url}`,
    headers: new HttpHeaders({ 'X-token': localStorage.getItem('user') || '' }),
  });

  return next(clone);
};
