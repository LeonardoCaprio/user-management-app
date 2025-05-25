import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../core/model/user';
import { UserService } from '../../core/service/user.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorComponent } from '../../shared/error/error.component';
import { LoadingComponent } from "../../shared/loading/loading.component";

@Component({
  selector: 'app-user-list',
  imports: [
    MatTableModule,
    MatIcon,
    MatCardModule,
    MatChipsModule,
    CommonModule,
    MatProgressSpinnerModule,
    ErrorComponent,
    LoadingComponent
],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  displayedColumns: string[] = [
    'name',
    'username',
    'email',
    'city',
    'website',
    'action',
  ];
  totalUser: number = 0;
  lastUpdated: Date = new Date();
  private destroy$ = new Subject<void>();
  loading: boolean = false;
  error: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadInitialUser();
  }

  goBack(): void {
    window.history.back();
  }

  loadInitialUser = (): void => {
    this.loading = true;
    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (userData) => {
          this.loading = false;
          this.totalUser = userData.length;
          this.lastUpdated = new Date();
          this.users = userData;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message;
          this.loading = false;
        },
      });
    
  }

  viewDetails(userId: number): void {
    this.router.navigate(['/users', userId]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
