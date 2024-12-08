import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token/token.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  // Verificar si el usuario está logueado
  if (!(await tokenService.isLogged()) || !(await tokenService.isTokenValid())) {
    return router.createUrlTree(['/first-screen']);
  }

  // Obtener roles permitidos de la ruta
  const allowedRoles = route.data?.['roles'] as Array<string>;

  // Verificar si el usuario tiene un rol permitido
  const userRole = await tokenService.getRole();
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return router.createUrlTree(['/home']); // Redirigir si no tiene permiso
  }

  return true;
};
