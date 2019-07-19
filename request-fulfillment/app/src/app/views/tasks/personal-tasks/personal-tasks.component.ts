import { Component, OnInit } from '@angular/core';
import { AuthStorageService } from '../../../services/local-helpers/auth-storage.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TasksService } from '../../../services/api/tasks.service';
import { PersonalTaskActionsComponent } from '../../../components/personal-task-actions/personal-task-actions.component';
import * as moment from 'moment';

@Component({
  selector: 'app-personal-tasks',
  templateUrl: './personal-tasks.component.html',
  styleUrls: ['./personal-tasks.component.scss']
})
export class PersonalTasksComponent implements OnInit {

  personalTasks: LocalDataSource;
  tableSettings = {};

  constructor(
    private tasksService: TasksService,
    private authStorageService: AuthStorageService
  ) {
    this.personalTasks = new LocalDataSource();
  }

  ngOnInit() {
    this.updateTableSettings();
    this.loadTableData();
  }

  private loadTableData() {
    const username = this.authStorageService.getUsername();
    const authToken = this.authStorageService.getAuthToken();
    this.tasksService.getPersonalTasks({
      username: username,
      auth_token: authToken
    })
      .then((res) => {
        if (res.status === 'success') {
          this.personalTasks.load(res.data.tasks);
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
          width: '200px',
          type: 'custom',
          filter: false,
          renderComponent: PersonalTaskActionsComponent,
          onComponentInitFunction: (instance) => {
            instance.save.subscribe(row => {
              this.personalTasks.remove(row);
            });
          }
        }
      }
    };
    this.tableSettings = Object.assign({}, settings);
  }

}
