import { Injectable } from '@angular/core';
import { APIService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class TasksService {

    constructor(
        private apiService: APIService
    ) { }

    getTasks(data) {
        return this.apiService.sendGetRequest(data, '/tasks');
    }

    getPersonalTasks(data) {
        return this.apiService.sendGetRequest(data, '/tasks/personal');
    }

    getPendingTasks(data) {
        return this.apiService.sendGetRequest(data, '/tasks/pending');
    }

    getCompletedTasks(data) {
        return this.apiService.sendGetRequest(data, '/tasks/completed');
    }

    reply(requestID, data) {
        return this.apiService.sendPostRequest(data, `/tasks/${requestID}/manage/reply`);
    }

}
