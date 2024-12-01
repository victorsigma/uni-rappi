import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  // Verificar si el usuario está logueado
  if (!tokenService.isLogged()) {
    return router.createUrlTree(['/iniciar-sesion']);
  }

  // Obtener roles permitidos de la ruta
  const allowedRoles = route.data?.['roles'] as Array<string>;

  // Verificar si el usuario tiene un rol permitido
  const userRole = tokenService.getRole();
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return router.createUrlTree(['/home']); // Redirigir si no tiene permiso
  }

  // Permitir el acceso si cumple con las condiciones
  return true;
};
