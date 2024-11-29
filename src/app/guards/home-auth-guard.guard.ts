import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';

export const homeAuthGuardGuard: CanActivateFn = (route, state) => {
  const loginService: LoginService = inject(LoginService)
  return loginService.isAdmin().valueOf()
};
