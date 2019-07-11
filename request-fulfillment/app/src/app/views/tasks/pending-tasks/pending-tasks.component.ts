import { Component, OnInit } from '@angular/core';
import { AuthStorageService } from '../../../services/local-helpers/auth-storage.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TableTaskStatusComponent } from '../../../components/table-task-status/table-task-status';
import { TasksService } from '../../../services/api/tasks.service';

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
          this.pendingTasks.load(res.data.tasks);
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
          title: 'Date'
        },
        subject: {
          title: 'Subject'
        },
        text: {
          title: 'Text'
        },
        // is_approved: {
        //   title: 'Status',
        //   width: '200px',
        //   type: 'custom',
        //   filter: false,
        //   renderComponent: TableTaskStatusComponent,
        //   onComponentInitFunction: (instance) => {
        //     instance.save.subscribe(row => {
        //       this.pendingTasks.remove(row);
        //     });
        //   }
        // }
      }
    };
    this.tableSettings = Object.assign({}, settings);
  }

}
