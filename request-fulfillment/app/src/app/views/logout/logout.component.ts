import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/api/auth.service';
import { AuthStorageService } from '../../services/local-helpers/auth-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private authStorageService: AuthStorageService
  ) { }

  ngOnInit() {
    if (this.authStorageService.getAuthStatus()) {
      const username = this.authStorageService.getUsername();
      const authToken = this.authStorageService.getAuthToken();
      this.authService.logout({
        username: username,
        auth_token: authToken
      })
        .then((res) => {
          if (res.status === 'success') {
            this.authStorageService.clearLoginDetails();
            this.router.navigateByUrl('/login');
          } else {
            this.authStorageService.clearLoginDetails();
            this.router.navigateByUrl('/login');
          }
        });
    } else {
      this.authStorageService.clearLoginDetails();
      this.router.navigateByUrl('/login');
    }
  }

}
