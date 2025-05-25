import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, MatIcon, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent implements OnInit {
  title = 'user-management-app';
  isMobile = false;
  isExpanded = true;
  selectedTab: string = '';

  constructor(
    private route: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
        if (!this.isMobile) {
          this.isExpanded = true;
        }
      });
  }

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  redirectNavigation(menu: string): void {
    if (menu === 'dashboard') {
      this.route.navigate(['/']);
      this.selectedTab = menu;
    } else if (menu === 'userPanel') {
      this.route.navigate(['/users']);
      this.selectedTab = menu;
    }
  }

  ngOnInit(): void {
    this.route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        const stateUrl = url.split('/')
        if (url === '/' || stateUrl[1] === 'dashboard') {
          this.selectedTab = 'dashboard';
        } else if (stateUrl[1] === 'users') {
          this.selectedTab = 'userPanel';
        }
      });
  }
}
