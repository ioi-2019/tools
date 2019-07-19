import { Injectable } from '@angular/core';
import { APIService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class TasksService {

    constructor(
        private apiService: APIService
    ) { }

    getTask(taskID, data) {
        return this.apiService.sendGetRequest(data, `/tasks/${taskID}`);
    }

    getTasks(data) {
        return this.apiService.sendGetRequest(data, '/tasks');
    }

    getPersonalTasks(data) {
        return this.apiService.sendGetRequest(data, '/tasks/personal');
    }

    getPendingTasks(data) {
        return this.apiService.sendGetRequest(data, '/tasks/new');
    }

    getCompletedTasks(data) {
        return this.apiService.sendGetRequest(data, '/tasks/completed');
    }

    assignUser(taskID, data) {
        return this.apiService.sendPostRequest(data, `/tasks/${taskID}/manage/assign`);
    }

    unassignUser(taskID, data) {
        return this.apiService.sendPostRequest(data, `/tasks/${taskID}/manage/unassign`);
    }

    replyTask(taskID, data) {
        return this.apiService.sendPostRequest(data, `/tasks/${taskID}/manage/reply`);
    }

    completeTask(taskID, data) {
        return this.apiService.sendPostRequest(data, `/tasks/${taskID}/manage/complete`);
    }

}
