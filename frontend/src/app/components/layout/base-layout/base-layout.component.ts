import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { ThemeService } from '../../../services/theme.service';

@Component({
  standalone: true,
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  imports: [
    RouterOutlet,
    CommonModule,
    MenuModule,
    BadgeModule,
    RippleModule,
    AvatarModule,
    Button,
    RouterLink,
  ],
})
export class BaseLayoutComponent implements OnInit {
  items: MenuItem[] | undefined;
  themeState: { colors: 'light' | 'dark'; icon: string } = {
    colors: 'light',
    icon: 'pi pi-moon',
  };

  constructor(public themeService: ThemeService) {
    this.themeService.currentThemeState.subscribe((state) => {
      this.themeState = state;
    });
  }

  ngOnInit() {
    this.items = [
      {
        separator: true,
      },
      {
        label: '',
        items: [
          {
            label: 'Home',
            icon: 'pi pi-home',
            route: '/home',
          },
          {
            label: 'Login',
            icon: 'pi pi-sign-in',
            route: '/login',
          },
        ],
      },
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            route: '/profile',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
          },
        ],
      },
      {
        separator: true,
      },
    ];
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
