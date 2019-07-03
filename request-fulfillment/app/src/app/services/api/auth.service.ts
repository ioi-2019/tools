import { Injectable } from '@angular/core';
import { APIService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private apiService: APIService
    ) { }

    login(data) {
        return this.apiService.sendPostRequest(data, '/auth/login');
    }

    logout(data) {
        return this.apiService.sendPostRequest(data, '/auth/logout');
    }

    register(data) {
        return this.apiService.sendPostRequest(data, '/auth/register');
    }

}
