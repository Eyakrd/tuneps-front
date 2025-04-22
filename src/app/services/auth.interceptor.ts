import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);
  console.log('Interceptor processing request to:', req.url); // Debug log
  console.log('Token exists:', !!token); // Debug log

  // Skip for auth requests and non-API requests
  if (req.url.includes('/api/v1/user/')) {
    return next(req);
  }

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });return next(authReq);}
    if (req.url.startsWith('http://localhost:8080/api')) {
      router.navigate(['/login']);
      return next(req);
  }

  return next(req);
};