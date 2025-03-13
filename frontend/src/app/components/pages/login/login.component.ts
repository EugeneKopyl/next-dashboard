import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  imports: [ButtonModule],
})
export class LoginComponent {
  constructor(private router: Router) {}

  login() {
    this.router.navigate(['/profile']);
  }

  loginWithGoogle() {
    console.log('Logging in with Google...');
  }
}
