import { CanActivateFn,Router } from '@angular/router';
import { UsersService } from './users.service';
import { inject } from '@angular/core';

function checkAuthenticationAndRole(isRoleValid: boolean): boolean {
  const router = inject(Router);
  
  if (isRoleValid) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}

export const clientsGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsersService);
  return checkAuthenticationAndRole(userService.isClient());
};

export const prestataireGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsersService);
  return checkAuthenticationAndRole(userService.isPrestataire());
};

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsersService);
  return checkAuthenticationAndRole(userService.isAuthenticated());
};

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsersService);
  return checkAuthenticationAndRole(userService.isAdmin());
};
