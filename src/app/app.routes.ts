import { Routes } from '@angular/router';
import { authGuard } from "./shared/guard/auth.guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/auth/auth.component').then((c) => c.AuthComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent)
      }
    ]
  },
  {
    path: 'system',
    loadComponent: () => import('./layouts/system/system.component').then((c) => c.SystemComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/account/account.component').then((c) => c.AccountComponent)
      }
    ],
    canActivate: [authGuard],

  },
  {
    path: 'not-found',
    loadComponent: () => import('./shared/component/page-not-found/page-not-found.component').then((c) => c.PageNotFoundComponent)
  },
  {
    path: '**',
    redirectTo: '/not-found',
  }

];
