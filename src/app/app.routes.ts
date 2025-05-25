import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
    {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
    path: 'users',
    loadComponent: () => import('./features/user-list/user-list.component').then((m) => m.UserListComponent),
    title: 'Users List',
  },
  {
    path: 'users/:id',
    loadComponent: () =>
      import('./features/user-detail/user-detail.component').then(
        (m) => m.UserDetailComponent
      ),
    title: 'User Details',
  },
  {
    path: '**',
    loadComponent: () => import('./features/page-not-found/page-not-found.component').then((m) => m.PageNotFoundComponent),
    title: '404 - Page Not Found',
  }
];
