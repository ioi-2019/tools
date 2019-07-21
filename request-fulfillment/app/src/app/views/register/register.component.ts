import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/api/auth.service';
import { AuthStorageService } from '../../services/local-helpers/auth-storage.service';
import { ToastrService } from 'ngx-toastr';

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
    }, { validators: this.checkPasswords });

    constructor(
        private router: Router,
        private toastrService: ToastrService,
        private authService: AuthService,
        private authStorageService: AuthStorageService
    ) { }

    ngOnInit() {
        if (this.authStorageService.getAuthStatus()) {
            this.router.navigateByUrl('/dashboard');
        }
    }

    register() {
        let errorMessage = null;
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
                    } else {
                        errorMessage = 'Registration failed';
                        if (res.message) {
                            errorMessage = res.message;
                        }
                        this.toastrService.error(errorMessage);
                    }
                });
        } else {
            let errors = this.registrationForm.get('username').errors;
            if (errors != null) {
                if (errors.required != null) {
                    errorMessage = `Username is required!`;
                } else if (errors.minlength != null) {
                    errorMessage = `Username minimum length should be ${errors.minlength.requiredLength}`;
                } else if (errors.maxlength != null) {
                    errorMessage = `Username maximum length should be ${errors.maxlength.requiredLength}`;
                }
            } else {
                errors = this.registrationForm.get('firstName').errors;
                if (errors != null) {
                    if (errors.required != null) {
                        errorMessage = `First name is required!`;
                    } else if (errors.minlength != null) {
                        errorMessage = `First name minimum length should be ${errors.minlength.requiredLength}`;
                    } else if (errors.maxlength != null) {
                        errorMessage = `First name maximum length should be ${errors.maxlength.requiredLength}`;
                    }
                } else {
                    errors = this.registrationForm.get('lastName').errors;
                    if (errors != null) {
                        if (errors.required != null) {
                            errorMessage = `Last name is required!`;
                        } else if (errors.minlength != null) {
                            errorMessage = `Last name minimum length should be ${errors.minlength.requiredLength}`;
                        } else if (errors.maxlength != null) {
                            errorMessage = `Last name maximum length should be ${errors.maxlength.requiredLength}`;
                        }
                    } else {
                        errors = this.registrationForm.get('password').errors;
                        if (errors != null) {
                            if (errors.required != null) {
                                errorMessage = `Password is required!`;
                            } else if (errors.minlength != null) {
                                errorMessage = `Password minimum length should be ${errors.minlength.requiredLength}`;
                            } else if (errors.maxlength != null) {
                                errorMessage = `Password maximum length should be ${errors.maxlength.requiredLength}`;
                            }
                        } else {
                            errors = this.registrationForm.get('passwordRepeat').errors;
                            if (errors != null) {
                                if (errors.required != null) {
                                    errorMessage = `Password repeat is required!`;
                                } else if (errors.minlength != null) {
                                    errorMessage = `Password repeat minimum length should be ${errors.minlength.requiredLength}`;
                                } else if (errors.maxlength != null) {
                                    errorMessage = `Password repeat maximum length should be ${errors.maxlength.requiredLength}`;
                                }
                            } else {
                                errors = this.registrationForm.errors;
                                if (errors != null) {
                                    if (errors.notSame === true) {
                                        errorMessage = `Passwords do not match!`;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (errorMessage == null) {
                errorMessage = 'Error occured';
            }
            this.toastrService.error(errorMessage);
        }
    }

    checkPasswords(group: FormGroup) {
        const password = group.controls.password.value;
        const passwordRepeat = group.controls.passwordRepeat.value;

        return password === passwordRepeat ? null : { notSame: true };
    }

}
