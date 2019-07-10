import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/api/auth.service';
import { AuthStorageService } from '../../services/local-helpers/auth-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private authStorageService: AuthStorageService
  ) { }

  ngOnInit() {
    if (this.authStorageService.getAuthStatus()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  login() {
    this.authService.login({
      username: this.username,
      password: this.password
    })
      .then((res) => {
        if (res.status === 'success') {
          this.authStorageService.setAuthStatus(true);
          this.authStorageService.setAdminStatus(res.data.account.is_admin);
          this.authStorageService.setUsername(res.data.account.username);
          this.authStorageService.setAuthToken(res.data.account.auth_token);
          this.router.navigateByUrl('/dashboard');
        }
      });
  }

  register() {
    this.router.navigateByUrl('/register');
  }

}
