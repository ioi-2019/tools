import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
    providedIn: 'root'
})
export class AuthStorageService {

    constructor(
        private storage: LocalStorageService
    ) { }

    private retrieve(key: string) {
        return this.storage.retrieve(key);
    }

    private store(key: string, value: any) {
        return this.storage.store(key, value);
    }

    private clear(key?: string) {
        return this.storage.clear(key);
    }

    getUsername() {
        this.retrieve('username');
    }

    getAuthToken() {
        this.retrieve('authToken');
    }

    setUsername(username: string) {
        this.store('username', username);
    }

    setAuthToken(authToken: string) {
        this.store('authToken', authToken);
    }

    clearLoginDetails() {
        this.clear();
    }

}
