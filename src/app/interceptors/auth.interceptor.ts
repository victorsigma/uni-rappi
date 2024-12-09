import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TokenService } from '../services/token/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  // Obtener el token de forma asíncrona
  return from(tokenService.getToken()).pipe(
    mergeMap((token) => {
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      return next(req);
    })
  );
};
