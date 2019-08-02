import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStorageService } from '../../../services/local-helpers/auth-storage.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TasksService } from '../../../services/api/tasks.service';
import { ConstantsService } from '../../../services/local-helpers/contants.service';
import { CompletedTaskActionsComponent } from '../../../components/completed-task-actions/completed-task-actions.component';
import * as moment from 'moment';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss']
})
export class CompletedTasksComponent implements OnInit, OnDestroy {

  completedTasks: LocalDataSource;
  tableSettings = {};
  refreshTimer: any;
  isDataLoaded: boolean;

  constructor(
    private tasksService: TasksService,
    private constantsService: ConstantsService,
    private authStorageService: AuthStorageService
  ) {
    this.completedTasks = new LocalDataSource();
    this.isDataLoaded = false;
  }

  ngOnInit() {
    this.updateTableSettings();
    this.loadTableData();
    this.refreshTimer = setInterval(() => {
      this.loadTableData();
    }, this.constantsService.COMPLETED_TASKS_REFRESH_INTERVAL);
  }

  ngOnDestroy() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  }

  private loadTableData() {
    const username = this.authStorageService.getUsername();
    const authToken = this.authStorageService.getAuthToken();
    this.tasksService.getCompletedTasks({
      username: username,
      auth_token: authToken
    })
      .then((res) => {
        if (res.status === 'success') {
          this.completedTasks.load(res.data.tasks)
            .then(() => {
              if (this.isDataLoaded === false) {
                this.completedTasks.setPaging(1, 15, true);
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
        assignee: {
          title: 'Assignee'
        },
        actions: {
          title: 'Actions',
          width: '200px',
          type: 'custom',
          filter: false,
          renderComponent: CompletedTaskActionsComponent
        }
      }
    };
    this.tableSettings = Object.assign({}, settings);
  }

}
