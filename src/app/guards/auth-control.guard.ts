import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authControlGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService);
  if(authService.isLoggedIn()){
    router.navigate(['person-list'])
    return true;
  }else{
    router.navigate(['login'])
    return false;
  }
};
