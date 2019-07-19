import { OnInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { AuthStorageService } from '../../services/local-helpers/auth-storage.service';
import { TasksService } from '../../services/api/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-task-actions',
  template: `
      <div style="text-align: center;">
        <button
          type="submit" class="btn btn-sm btn-primary active"
          (click)="view()">
          <i class="fa fa-dot-circle-o"></i> View
        </button>
        <button
          type="submit" class="btn btn-sm btn-danger active"
          (click)="unassign()">
          <i class="fa fa-ban"></i> Unassign
        </button>
      </div>
    `,
})
export class PersonalTaskActionsComponent implements ViewCell, OnInit {

  isAssigned: boolean;
  taskID: number;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private tasksService: TasksService,
    private authStorageService: AuthStorageService
  ) {

  }

  ngOnInit() {
    this.isAssigned = true;
    this.taskID = this.rowData.id;
  }

  unassign() {
    const username = this.authStorageService.getUsername();
    const authToken = this.authStorageService.getAuthToken();
    this.tasksService.unassignUser(this.taskID, {
      username: username,
      auth_token: authToken
    })
      .then((res) => {
        if (res.status === 'success') {
          this.save.emit(this.rowData);
        }
      });
  }

  view() {
    this.router.navigate(['/task', this.taskID]);
  }

}
