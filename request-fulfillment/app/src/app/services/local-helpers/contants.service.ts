import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConstantsService {

    readonly API_URL = environment.apiURL;
    readonly PENDING_TASKS_REFRESH_INTERVAL = environment.pendingTasksRefreshInterval;
    readonly COMPLETED_TASKS_REFRESH_INTERVAL = environment.completedTasksRefreshInterval;

    constructor() { }

}
