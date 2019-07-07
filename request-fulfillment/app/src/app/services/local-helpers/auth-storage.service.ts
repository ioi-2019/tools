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

    getAuthStatus(): boolean {
        return this.retrieve('authStatus');
    }

    getUsername(): string {
        return this.retrieve('username');
    }

    getAuthToken(): string {
        return this.retrieve('authToken');
    }

    setAuthStatus(authStatus: boolean) {
        this.store('authStatus', authStatus);
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
