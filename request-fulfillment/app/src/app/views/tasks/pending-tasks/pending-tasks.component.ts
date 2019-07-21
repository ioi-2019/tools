import { Component, OnInit } from '@angular/core';
import { AuthStorageService } from '../../../services/local-helpers/auth-storage.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TasksService } from '../../../services/api/tasks.service';
import { NewTaskActionsComponent } from '../../../components/new-task-actions/new-task-actions.component';
import * as moment from 'moment';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.scss']
})
export class PendingTasksComponent implements OnInit {

  pendingTasks: LocalDataSource;
  tableSettings = {};

  constructor(
    private tasksService: TasksService,
    private authStorageService: AuthStorageService
  ) {
    this.pendingTasks = new LocalDataSource();
  }

  ngOnInit() {
    this.updateTableSettings();
    this.loadTableData();
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
              this.pendingTasks.setPaging(1, 15, true);
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

}
