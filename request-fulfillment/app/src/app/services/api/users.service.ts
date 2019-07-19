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

    getActiveUsers(data) {
        return this.apiService.sendGetRequest(data, '/users/active');
    }

    getPendingUsers(data) {
        return this.apiService.sendGetRequest(data, '/users/pending');
    }

    searchUsers(data) {
        return this.apiService.sendGetRequest(data, '/users/search');
    }

    approveUser(userID, data) {
        return this.apiService.sendPostRequest(data, `/users/${userID}/manage/approve`);
    }

    rejectUser(userID, data) {
        return this.apiService.sendPostRequest(data, `/users/${userID}/manage/reject`);
    }

    giveAdminPermission(userID, data) {
        return this.apiService.sendPostRequest(data, `/users/${userID}/manage/give-admin-privilege`);
    }

    takeAdminPermission(userID, data) {
        return this.apiService.sendPostRequest(data, `/users/${userID}/manage/take-admin-privilege`);
    }

}
