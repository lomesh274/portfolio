import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = signal(false);
  currentTheme = this.themeService.currentTheme;

  constructor(
    private themeService: ThemeService,
    public authService: AuthService
  ) {}

  public navItems = computed(() => {
    const baseItems = [
      { path: '/home', label: 'Home' },
      { path: '/projects', label: 'Projects' },
      { path: '/contact', label: 'Contact' }
    ];

    if (this.authService.isAuthenticated()) {
      return [
        ...baseItems,
        { path: '/admin/dashboard', label: 'Dashboard' }
      ];
    }

    return baseItems;
  });

  get navItemsArray() {
    return this.navItems();
  }

  toggleMenu(): void {
    this.isMenuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get themeIcon(): string {
    return this.currentTheme() === 'light' ? 'dark_mode' : 'light_mode';
  }
}
