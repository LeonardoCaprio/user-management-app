import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../core/model/user';
import { UserService } from '../../core/service/user.service';
import { ErrorComponent } from '../../shared/error/error.component';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ErrorComponent,
    LoadingComponent,
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user!: User;
  currentUserId!: number;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  goBack(): void {
    window.history.back();
  }

  openInNewTab(url: string): void {
    window.open(`https://${url}`, '_blank');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const paramsId = params['id'];
      console.log(paramsId, 'ID')
      if (paramsId) {
        this.getUserDetail(paramsId);
      } else {
        this.error = 'ID tidak valid.';
        this.loading = false;
      }
    });
  }

  getUserDetail = (id: number): void => {
    this.loading = true;
    this.currentUserId = id;
    this.userService.getUserDetailById(Number(id)).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: () => {
        this.error = `We couldn’t find any matching user ${id} . Try a different user id.`;
        this.loading = false;
      },
    });
  };
}
