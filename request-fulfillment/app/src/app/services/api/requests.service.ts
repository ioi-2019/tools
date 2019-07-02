import { Injectable } from '@angular/core';
import { APIService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class RequestsService {

    constructor(
        private apiService: APIService
    ) { }

    reply(requestID, data) {
        return this.apiService.sendPostRequest(data, `/requests/${requestID}/reply`);
    }

}
