import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const currentUser = localStorage.getItem('token')
  const router = inject(Router)
  if (currentUser) {
    return true
  }
  router.navigate(['/'])
  return false;
};
