import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/api/auth.service';
import { AuthStorageService } from '../../services/local-helpers/auth-storage.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

    registrationForm = new FormGroup({
        username: new FormControl('', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(16)
        ]),
        firstName: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(16)
        ]),
        lastName: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(16)
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20)
        ]),
        passwordRepeat: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20)
        ]),
    });

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

    register() {
        if (this.registrationForm.valid) {
            this.authService.register({
                username: this.registrationForm.get('username').value,
                first_name: this.registrationForm.get('firstName').value,
                last_name: this.registrationForm.get('lastName').value,
                password: this.registrationForm.get('password').value
            })
                .then((res) => {
                    if (res.status === 'success') {
                        this.router.navigateByUrl('/login');
                    }
                });
        }
    }

}
