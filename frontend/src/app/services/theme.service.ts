import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

interface ThemeState {
  colors: 'light' | 'dark';
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeStateSubject = new BehaviorSubject<ThemeState>({
    colors: 'light',
    icon: 'pi pi-moon',
  });
  private isBrowser: boolean;

  public currentThemeState = this.themeStateSubject.asObservable();

  public constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadInitialTheme();
  }

  public toggleTheme() {
    const currentState = this.themeStateSubject.value;
    const newTheme = currentState.colors === 'light' ? 'dark' : 'light';
    const newIcon = newTheme === 'light' ? 'pi pi-moon' : 'pi pi-sun';

    this.themeStateSubject.next({
      colors: newTheme,
      icon: newIcon,
    });

    if (this.isBrowser) {
      localStorage.setItem('theme', newTheme);
      this.applyThemeToDom(newTheme);
    }
  }

  private loadInitialTheme() {
    if (this.isBrowser) {
      const savedTheme =
        (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
      this.themeStateSubject.next({
        colors: savedTheme,
        icon: savedTheme === 'light' ? 'pi pi-moon' : 'pi pi-sun',
      });
      this.applyThemeToDom(savedTheme);
    }
  }

  private applyThemeToDom(theme: 'light' | 'dark') {
    const element = document.querySelector('html');
    if (element) {
      element.classList.toggle('dark-theme', theme === 'dark');
    }
  }
}
