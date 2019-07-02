import { Injectable } from '@angular/core';
import { APIService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(
        private apiService: APIService
    ) { }

    getUsers(data) {
        return this.apiService.sendGetRequest(data, '/users');
    }

    acceptUser(userID, data) {
        return this.apiService.sendPostRequest(data, `/users/${userID}/accept`);
    }

    rejectUser(userID, data) {
        return this.apiService.sendPostRequest(data, `/users/${userID}/reject`);
    }

    giveAdminPermission(userID, data) {
        return this.apiService.sendPostRequest(data, `/users/${userID}/give-admin-permission`);
    }

    takeAdminPermission(userID, data) {
        return this.apiService.sendPostRequest(data, `/users/${userID}/take-admin-permission`);
    }

}
