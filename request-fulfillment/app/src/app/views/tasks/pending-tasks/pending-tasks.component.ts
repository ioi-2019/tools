import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStorageService } from '../../../services/local-helpers/auth-storage.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TasksService } from '../../../services/api/tasks.service';
import { ConstantsService } from '../../../services/local-helpers/contants.service';
import { NewTaskActionsComponent } from '../../../components/new-task-actions/new-task-actions.component';
import * as moment from 'moment';

@Component({
    selector: 'app-pending-tasks',
    templateUrl: './pending-tasks.component.html',
    styleUrls: ['./pending-tasks.component.scss']
})
export class PendingTasksComponent implements OnInit, OnDestroy {

    pendingTasks: LocalDataSource;
    tableSettings = {};
    refreshTimer: any;
    isDataLoaded: boolean;
    filters: any[];

    constructor(
        private tasksService: TasksService,
        private constantsService: ConstantsService,
        private authStorageService: AuthStorageService
    ) {
        this.pendingTasks = new LocalDataSource();
        this.isDataLoaded = false;
    }

    ngOnInit() {
        this.updateTableSettings();
        this.loadUserFilters();
        this.loadTableData();
        this.restartTimer();
    }

    ngOnDestroy() {
        this.stopTimer();
    }

    private loadUserFilters() {
        const username = this.authStorageService.getUsername();
        const authToken = this.authStorageService.getAuthToken();
        this.tasksService.getFilters({
            username: username,
            auth_token: authToken
        })
            .then((res) => {
                if (res.status === 'success') {
                    this.filters = res.data.filters;
                }
            });
    }

    private loadTableData() {
        const username = this.authStorageService.getUsername();
        const authToken = this.authStorageService.getAuthToken();
        this.tasksService.getPendingTasks({
            username: username,
            auth_token: authToken
        })
            .then((res) => {
                if (res.status === 'success') {
                    this.pendingTasks.load(res.data.tasks)
                        .then(() => {
                            if (this.isDataLoaded === false) {
                                this.pendingTasks.setPaging(1, 15, true);
                                this.isDataLoaded = true;
                            }
                        });
                }
            });
    }

    private updateTableSettings() {
        const settings = {
            actions: false,
            columns: {
                id: {
                    title: 'ID',
                    width: '100px',
                },
                question_timestamp: {
                    title: 'Date',
                    valuePrepareFunction: (value) => {
                        return moment(value).format('HH:mm DD/MM/YYYY').toString();
                    }
                },
                author: {
                    title: 'Author'
                },
                subject: {
                    title: 'Subject'
                },
                actions: {
                    title: 'Actions',
                    width: '320px',
                    type: 'custom',
                    filter: false,
                    renderComponent: NewTaskActionsComponent,
                    onComponentInitFunction: (instance) => {
                        instance.save.subscribe(row => {
                            this.pendingTasks.remove(row);
                        });
                    }
                }
            }
        };
        this.tableSettings = Object.assign({}, settings);
    }

    manageUserFilter(filterID) {
        const username = this.authStorageService.getUsername();
        const authToken = this.authStorageService.getAuthToken();
        const filterIndex = this.filters.findIndex(x => x.id === filterID);
        const isEnabled = this.filters[filterIndex].enabled;
        if (isEnabled === true) {
            this.tasksService.removeUserFilter({
                username: username,
                auth_token: authToken,
                filter_id: filterID
            })
                .then((res) => {
                    if (res.status === 'success') {
                        this.filters[filterIndex].enabled = !isEnabled;
                        this.loadTableData();
                        this.restartTimer();
                    }
                });
        } else {
            this.tasksService.addUserFilter({
                username: username,
                auth_token: authToken,
                filter_id: filterID
            })
                .then((res) => {
                    if (res.status === 'success') {
                        this.filters[filterIndex].enabled = !isEnabled;
                        this.loadTableData();
                        this.restartTimer();
                    }
                });
        }
    }

    private stopTimer() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
        }
    }

    private restartTimer() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = setInterval(() => {
                this.loadTableData();
            }, this.constantsService.PENDING_TASKS_REFRESH_INTERVAL);
        }
    }

}
