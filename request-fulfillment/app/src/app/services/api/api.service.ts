import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConstantsService } from '../local-helpers/contants.service';
import { AuthStorageService } from '../local-helpers/auth-storage.service';

export interface APIResponse {
    status: string;
    data?: {
        [key: string]: any
    };
}

@Injectable({
    providedIn: 'root'
})
export class APIService {

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private constantsService: ConstantsService,
        private authStorageService: AuthStorageService
    ) { }

    sendGetRequest(data, routeURL) {
        return new Promise<APIResponse>((resolve, reject) => {
            let headers = new HttpHeaders();
            headers = headers.append('Content-Type', 'application/json');
            let params = new HttpParams();
            Object.keys(data).forEach(function (key) {
                params = params.append(key, data[key]);
            });
            this.httpClient.get(this.constantsService.API_URL + routeURL, { headers: headers, params: params })
                .subscribe((res: any) => {
                    const status = res.status;
                    if (status === 'auth_fail') {
                        resolve(res);
                        this.authStorageService.clearLoginDetails();
                        this.router.navigate(['/login']);
                    } else {
                        resolve(res);
                    }
                }, (err) => {
                    reject(err);
                });
        });
    }

    sendPostRequest(data, routeURL) {
        return new Promise<APIResponse>((resolve, reject) => {
            let headers = new HttpHeaders();
            headers = headers.append('Content-Type', 'application/json');
            this.httpClient.post(this.constantsService.API_URL + routeURL, JSON.stringify(data), { headers: headers })
                .subscribe((res: any) => {
                    const status = res.status;
                    if (status === 'auth_fail') {
                        resolve(res);
                        this.authStorageService.clearLoginDetails();
                        this.router.navigate(['/login']);
                    } else {
                        resolve(res);
                    }
                }, (err) => {
                    reject(err);
                });
        });
    }

}
